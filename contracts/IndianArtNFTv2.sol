// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "erc721a-upgradeable/contracts/ERC721AUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract IndianArtNFTv2 is
    Initializable,
    ERC721AUpgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ERC2981Upgradeable
{
    mapping(uint256 => uint256) public prices;
    mapping(address => bool) public whitelist;

    uint256 public mintPrice;

    event NFTMinted(address indexed to, uint256 tokenId, uint256 quantity);
    event NFTPurchased(address indexed buyer, uint256 tokenId, uint256 price);
    event NFTBurned(uint256 tokenId);
    event Whitelisted(address indexed user, bool status);

    /// @notice Initializes the contract with the owner and default royalty
    function initialize(address initialOwner) public initializer {
        require(initialOwner != address(0), "Invalid owner");

        __ERC721A_init("IndianArtNFTv2", "IART");
        __Ownable_init();
        __Pausable_init();
        __ERC2981_init();

        _transferOwnership(initialOwner);
        _setDefaultRoyalty(initialOwner, 500); // 5% royalty
        mintPrice = 0.01 ether;
    }

    function mint(
        address to,
        uint256 quantity
    ) external onlyOwner whenNotPaused {
        _safeMint(to, quantity);
        emit NFTMinted(to, totalSupply() - 1, quantity);
    }

    function publicMint(uint256 quantity) external payable whenNotPaused {
        require(msg.value == quantity * mintPrice, "Wrong ETH sent");
        _safeMint(msg.sender, quantity);
        emit NFTMinted(msg.sender, totalSupply() - 1, quantity);
    }

    function whitelistMint(uint256 quantity) external payable whenNotPaused {
        require(whitelist[msg.sender], "Not whitelisted");
        require(msg.value == quantity * mintPrice, "Wrong ETH sent");
        _safeMint(msg.sender, quantity);
        emit NFTMinted(msg.sender, totalSupply() - 1, quantity);
    }

    function setPrice(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        prices[tokenId] = price;
    }

    function buy(uint256 tokenId) external payable whenNotPaused {
        uint256 price = prices[tokenId];
        address tokenOwner = ownerOf(tokenId);
        require(msg.value == price, "Incorrect price");
        require(tokenOwner != msg.sender, "Cannot buy your own NFT");

        safeTransferFrom(tokenOwner, msg.sender, tokenId);

        (bool sent, ) = payable(tokenOwner).call{value: msg.value}("");
        require(sent, "Transfer failed");

        prices[tokenId] = 0;

        emit NFTPurchased(msg.sender, tokenId, price);
    }

    function burn(uint256 tokenId) external whenNotPaused {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        _burn(tokenId);
        emit NFTBurned(tokenId);
    }

    function withdraw() external onlyOwner {
        (bool sent, ) = payable(owner()).call{value: address(this).balance}("");
        require(sent, "Withdraw failed");
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setWhitelist(address user, bool status) external onlyOwner {
        whitelist[user] = status;
        emit Whitelisted(user, status);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721AUpgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}



