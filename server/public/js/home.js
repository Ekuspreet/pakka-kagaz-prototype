console.log("Home JS loaded");

document.addEventListener("DOMContentLoaded", async () => {
  let ideas = [];
  
  async function getIdea(id) {
    try {
      const idea = await contract.getIdea(id);
      return idea; // Return the idea object for further processing
    } catch (error) {
      console.error("Error fetching idea:", error);
      return null; // Return null in case of error
    }
  }
  
  let i = 1;
  while (i < 11) {
    const idea = await getIdea(i);
    if (!idea || !idea.title) {
      break;
    }
    ideas.push(idea);
    i++;
  }
  

  // Select the tbody element by its class name
  const tableBody = document.querySelector(".ideas-table-body");

  ideas.forEach((idea, index) => {
    const row = document.createElement("tr");
    
    const srNoCell = document.createElement("td");
    srNoCell.textContent = index + 1; // Sr. No. is the index + 1
    
    const titleCell = document.createElement("td");
    titleCell.textContent = idea.title || 'No Title'; // Handle case if title is not defined
    
    const authorCell = document.createElement("td");
    authorCell.textContent = idea.inventor || 'Unknown'; // Handle case if inventor is not defined
    
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = idea.description || 'No Description'; // Handle case if description is not defined
    
    const urlCell = document.createElement("td");
    const urlLink = document.createElement("a");
    urlLink.href = idea.fileUrl || '#'; // Handle case if fileUrl is not defined
    urlLink.textContent = idea.fileUrl ? 'View File' : 'No URL'; // Text based on URL presence
    urlLink.target = '_blank'; // Open the URL in a new tab
    urlCell.appendChild(urlLink);
    
    row.appendChild(srNoCell);
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(descriptionCell);
    row.appendChild(urlCell);
    
    tableBody.appendChild(row);
  });
});
