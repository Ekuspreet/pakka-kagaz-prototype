const provider = new ethers.providers.Web3Provider(window.ethereum);
// Define your contract details
const contractAddress = "0xcA3096a7B1aB28DFb8c8676fd777ae2C18DD999e";

// Initialize signer
let connected = false;
let signer = provider.getSigner();
console.log(signer);

async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  console.log("Wallet connected!");
  console.log(signer);
  connected = true;
}
// Initialize contract
const contract = new ethers.Contract(contractAddress, abi, signer);

async function issueIdea(title, inventor, description, fileUrl) {
  try {
    const tx = await contract.issueIdea(title, inventor, description, fileUrl);
    await tx.wait();
    console.log("Idea issued successfully!");
  } catch (error) {
    console.error("Error issuing idea:", error);
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
