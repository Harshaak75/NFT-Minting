const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // Your deployed contract address
  const TO_ADDRESS = process.env.METAMASK_ACCOUNT_VAL;    // Wallet to receive the NFT

  if (!CONTRACT_ADDRESS || !TO_ADDRESS) {
    throw new Error("Missing CONTRACT_ADDRESS or METAMASK_ACCOUNT_VAL in .env");
  }

  const [deployer] = await ethers.getSigners();
  console.log("Minting from owner address:", deployer.address);

  // Attach to existing deployed contract
  const nftContract = await ethers.getContractAt("FewdotNFT", CONTRACT_ADDRESS);

  // Mint the NFT
  const tx = await nftContract.mint(TO_ADDRESS);
  await tx.wait();

  console.log(`✅ Minted 1 NFT to ${TO_ADDRESS}`);
  console.log(`📦 Transaction Hash: ${tx.hash}`);
  console.log(`🔗 View: https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main().catch((error) => {
  console.error("Minting failed:", error);
  process.exit(1);
});
