const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const IdeaRegistry = await hre.ethers.getContractFactory("IdeaRegistry");
  console.log("Deploying IdeaRegistry...");

  // Deploy the contract
  const ideaRegistry = await IdeaRegistry.deploy();
  await ideaRegistry.waitForDeployment();

  console.log("IdeaRegistry deployed to:", ideaRegistry);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
