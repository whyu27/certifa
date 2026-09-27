require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org";
const rawPrivateKey = (process.env.PRIVATE_KEY || "").trim();
const accounts = rawPrivateKey && rawPrivateKey !== "0x0000000000000000000000000000000000000000000000000000000000000001"
  ? [rawPrivateKey.startsWith("0x") ? rawPrivateKey : `0x${rawPrivateKey}`]
  : [];
const ETHERSCAN_API_KEY = (process.env.ETHERSCAN_API_KEY || "").trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: accounts,
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true,
  },
};
