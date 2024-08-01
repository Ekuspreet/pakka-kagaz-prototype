async function issueIdea(title, inventor, description, fileUrl) {
  try {
    loader_modal.showModal();
    const tx = await contract.issueIdea(title, inventor, description, fileUrl);
    await tx.wait();
    const txUrl = "https://amoy.polygonscan.com/tx/" + tx.hash;
    console.log("Idea issued:", txUrl);
    txn_success.showModal();
    document.getElementById("txUrl").href = txUrl;
  } catch (error) {
    console.error("Error issuing idea:", error);
  } finally {
    loader_modal.close();
  }
}

document
  .getElementById("issue-idea-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const inventor = document.getElementById("inventor").value;
    const description = document.getElementById("description").value;
    const fileUrl = document.getElementById("fileUrl").value;

    await issueIdea(title, inventor, description, fileUrl);
  });
