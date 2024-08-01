document
  .getElementById("get-idea-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const number = document.getElementById("ideaId").value;

    await getIdea(number);
  });

async function getIdea(id) {
  try {
    const idea = await contract.getIdea(id);
    document.getElementById("show-idea-1").innerText = idea.title;
    document.getElementById("show-idea-2").innerText = idea.inventor;
    document.getElementById("show-idea-3").innerText = idea.description;
    document.getElementById("show-idea-4").innerText = idea.fileUrl;
    document.getElementById("show-idea-4").href = idea.fileUrl;
  } catch (error) {
    console.error("Error fetching idea:", error);
  }
}