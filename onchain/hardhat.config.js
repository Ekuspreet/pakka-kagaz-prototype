require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_ETH_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    eth: {
      url: process.env.ALCHEMY_MAINNET_ETH_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    matic: {
      url: process.env.ALCHEMY_MAINNET_MATIC_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    amoy: {
      url: process.env.ALCHEMY_TESTNET_MATIC_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
