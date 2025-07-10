const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deploying from:", deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

  const FewdotNFT = await ethers.getContractFactory("FewdotNFT");

  const contract = await FewdotNFT.deploy(); // No arguments, as constructor doesn't take any
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ Contract deployed to:", contractAddress);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
