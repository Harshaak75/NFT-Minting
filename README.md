# FewdotNFT

A simple Ethereum NFT project using Hardhat, OpenZeppelin, and Ethers.js.  
This project demonstrates deploying and minting ERC721 NFTs on the mainnet.

---

## 📁 Project Structure

- `contracts/FewdotNFT.sol`  
  The main smart contract. Implements a basic ERC721 NFT with owner-only minting.

- `scripts/deploy.js`  
  Script to deploy the `FewdotNFT` contract to a blockchain network.

- `scripts/mint.js`  
  Script to mint an NFT from the deployed contract to a specified address.

- `hardhat.config.cjs`  
  Hardhat configuration file. Sets up Solidity version, networks, and Etherscan integration.

---

## 📝 Smart Contract: `FewdotNFT.sol`

- Inherits from OpenZeppelin’s `ERC721` and `Ownable`.
- Allows only the contract owner to mint new NFTs.
- Each minted NFT gets a unique, incrementing token ID.

**Key Functions:**
- `constructor()`: Sets the NFT name and symbol, and assigns ownership.
- `mint(address to)`: Mints a new NFT to the specified address (owner-only).

---

## ⚙️ Scripts

### `deploy.js`
- Deploys the `FewdotNFT` contract to the selected network.
- Prints the deployer address, balance, and deployed contract address.
- **Estimates deployment gas:** Before deploying, you can use Hardhat and Ethers.js to estimate how much gas the deployment will require. This helps you understand the cost before actually deploying.

### `mint.js`
- Mints an NFT to a specified address using the deployed contract.
- Reads the contract address and recipient from your `.env` file.
- Prints transaction details and a Sepolia Etherscan link.

---

## ⚒️ Hardhat Configuration: `hardhat.config.cjs`

- Sets Solidity version to `0.8.20`.
- Configures the Sepolia testnet using Infura and your private key.
- Integrates Etherscan for contract verification.

---

## 🚀 How to Run Locally

### 1. **Clone the Repository**
```sh
git clone <your-repo-url>
cd My-nft-profit
```

### 2. **Install Dependencies**
```sh
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the root directory with:
```
INFURA_PROJECT_ID=your_infura_project_id
METAMASK_PRIVATEKEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
CONTRACT_ADDRESS=your_deployed_contract_address   # (for mint.js)
METAMASK_ACCOUNT_VAL=recipient_wallet_address     # (for mint.js)
```

### 4. **Compile Contracts**
```sh
npx hardhat compile
```

### 5. **Estimate Deployment Gas (Optional)**
You can estimate how much gas the deployment will require before actually deploying.  
Add the following to your `deploy.js` before deployment:

```js
const gasEstimate = await FewdotNFT.signer.estimateGas(
  FewdotNFT.getDeployTransaction()
);
console.log("Estimated deployment gas:", gasEstimate.toString());
```

### 6. **Deploy the Contract**
```sh
npx hardhat run scripts/deploy.js --network mainnet
```
Copy the deployed contract address and update `CONTRACT_ADDRESS` in your `.env` file.

### 7. **Mint an NFT**
```sh
npx hardhat run scripts/mint.js --network mainnet
```

---

## 📝 Notes

- You need ETH in your wallet to deploy and mint.
- Only the contract owner (deployer) can mint NFTs.
- All scripts use environment variables for sensitive data—**never commit your `.env` file to version control.**

---

## 📚 Resources

- [OpenZeppelin Docs](https://docs.openzeppelin.com/contracts/)
- [Hardhat Docs](https://hardhat.org/getting-started/)
- [Ethers.js Docs](https://docs.ethers.org/)

---

**Happy minting!**