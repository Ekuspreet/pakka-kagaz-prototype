//* abi leke ao ethe


// Assuming the contract code is initialized here as described earlier
const provider = new ethers.providers.Web3Provider(window.ethereum);
// Define your contract details
const contractAddress = "0xcA3096a7B1aB28DFb8c8676fd777ae2C18DD999e";

// Initialize signer
let connected = false;
let signer = provider.getSigner();
console.log(signer);

// Initialize contract
const contract = new ethers.Contract(contractAddress, abi, signer);

async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  console.log("Wallet connected!");
  console.log(signer);
  connected = true;
}
// document
//   .getElementById("issue-idea-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const title = document.getElementById("title").value;
//     const inventor = document.getElementById("inventor").value;
//     const description = document.getElementById("description").value;
//     const fileUrl = document.getElementById("fileUrl").value;

//     await issueIdea(title, inventor, description, fileUrl);
//   });

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
