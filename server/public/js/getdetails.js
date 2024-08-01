//* abi leke ao ethe


// Assuming the contract code is initialized here as described earlier




document
  .getElementById("get-idea-form")
  .addEventListener("submit", async (event) => {
    console.log("Fetching idea");
    event.preventDefault();
    const number = document.getElementById("ideaId").value;
    console.log("Fetching idea with ID:", number);

    await getIdea(number);
  });

async function getIdea(id) {
  try {
    const idea = await contract.getIdea(id);
    console.log("Idea details:", idea);
    document.getElementById("show-idea-1").innerText = idea.title;
    document.getElementById("show-idea-2").innerText = idea.inventor;
    document.getElementById("show-idea-3").innerText = idea.description;
    document.getElementById("show-idea-4").innerText = idea.fileUrl;
  } catch (error) {
    console.error("Error fetching idea:", error);
  }
}

console.log("web3.js loaded");
