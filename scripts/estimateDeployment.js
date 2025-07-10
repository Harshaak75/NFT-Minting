const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🔍 Estimating from address:", deployer.address);

  const FewdotNFT = await ethers.getContractFactory("FewdotNFT");

  // Create the deployment transaction
  const deployTx = await FewdotNFT.getDeployTransaction();

  // Estimate gas
  const gasEstimate = await deployer.estimateGas(deployTx);

  // Get gas price using provider from ethers
  const provider = await ethers.provider; // Correct provider object
  const gasPrice = await provider.send("eth_gasPrice", []);

  const estimatedFeeWei = BigInt(gasEstimate) * BigInt(gasPrice);
  const estimatedFeeEth = ethers.formatEther(estimatedFeeWei);

  console.log("⛽ Estimated Gas Units:", gasEstimate.toString());
  console.log("⚡ Gas Price:", ethers.formatUnits(gasPrice.toString(), "gwei"), "Gwei");
  console.log("💰 Estimated Deployment Cost:", estimatedFeeEth, "ETH");
}

main().catch((err) => {
  console.error("❌ Estimation failed:", err);
  process.exit(1);
});
