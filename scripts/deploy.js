// const { ethers, upgrades } = require("hardhat");

// // import { ethers, upgrades } from "hardhat";

// async function main() {
//   const IndianArtNFT = await ethers.getContractFactory("IndianArtNFT");

//   const proxy = await upgrades.deployProxy(
//     IndianArtNFT,
//     ["0x5FDFa7efcE19B8Ac3CE8ef8205abB81Cd48Df425"], // Replace with your wallet address
//     { initializer: "initialize" }
//   );

//   await proxy.deployed();
//   console.log("✅ Proxy deployed to:", proxy.address);

//   // Mint 1 NFT after deployment
//   const mintTx = await proxy.publicMint(1, {
//     value: ethers.utils.parseEther("0.01")
//   });
//   await mintTx.wait();
//   console.log("✅ 1 NFT minted to wallet");
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });



// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   const balance = await ethers.provider.getBalance(deployer.address);
//   console.log("Deploying from:", deployer.address);
//   console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

//   const IndianArtNFT = await ethers.getContractFactory("IndianArtNFTv2");

//   const proxy = await upgrades.deployProxy(
//     IndianArtNFT,
//     ["0x5FDFa7efcE19B8Ac3CE8ef8205abB81Cd48Df425"],
//     { initializer: "initialize" }
//   );

//   await proxy.waitForDeployment();
//   const proxyAddress = await proxy.getAddress();

//   console.log("✅ Proxy deployed to:", proxyAddress);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });



const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deploying from:", deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

  const IndianArtNFTv2 = await ethers.getContractFactory("IndianArtNFTv2");

  const metamask_acc = process.env.METAMASK_ACCOUNT_VAL;

  const proxy = await upgrades.deployProxy(
    IndianArtNFTv2,
    [metamask_acc], // initializer param
    {
      initializer: "initialize",
    }
  );

  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  console.log("✅ Proxy deployed to:", proxyAddress);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
