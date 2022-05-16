// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
// Use the previous contract
import "./RoleControl.sol";
contract Otentix is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
      Counters.Counter private _tokenIdCounter;
    using SafeMath for uint256;
    Counters.Counter private _tokenIds;
//the maxi nbre of nft that can be minted 
    uint public constant MAX_SUPPLY = 100;
    //the amount required to buy 1 nft 
    uint public constant PRICE = 0.01 ether;
    //the maxi nbre of mints per transaction
    uint public constant MAX_PER_MINT = 5;
//the ipfs url of the folder containing the json metadataaa
    string public baseTokenURI;
    using Strings for uint256;  
    //list of existing uri
    mapping(string => uint8) existingURIs;
    //track all adr alloawed
mapping(address => bool) public isAllowlistAddress;
// will track if a particular signature has already been used to mint
      mapping(bytes => bool) public signatureUsed;
// mapping to insure that any token has a unique URI
mapping(string => uint8) hashes;

      uint256 listingPrice = 0.025 ether;
 //   address payable owner;

//mapping(uint256 => MarketItem) private idToMarketItem;
constructor(string memory baseURI) ERC721("Otentix", "nft") {
     setBaseURI(baseURI);
}

/*function reserveNFTs() public onlyOwner {
  //check the total number of NFTs minted
     uint totalMinted = _tokenIds.current();
     //test :  if there are enough NFTs to reserve
     require(
        totalMinted.add(10) < MAX_SUPPLY, "Not enough NFTs"
     );
     // if test ok: proceed to mint 10 nft 
     for (uint i = 0; i < 10; i++) {
          _mintSingleNFT();
     }
}*/
 function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
    // Allowlist addresses pour assuer qu'un wallet ne peut minté qu'une seule fois 
    //called only by contract's owner and that can add one more addr to isAllowlistAdr mapping 
    //ne peut etre appellé que par l'owner du contrat
   function allowlistAddresses(address[] calldata wAddresses) public onlyOwner {
    for (uint i = 0; i < wAddresses.length; i++) {
        isAllowlistAddress[wAddresses[i]] = true;
    }
}
// get the hashed addr of alowlist and the signature as argument 
// ==> output the addr of the signer
 function recoverSigner(bytes32 hash, bytes memory signature) public pure returns (address) {
        bytes32 messageDigest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        return ECDSA.recover(messageDigest, signature);
    }
    // use this function to  hash  string
    function getHash(string memory str) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(str));
    }  
function mintNFTs(uint _count) public payable {
     uint totalMinted = _tokenIds.current();
     //test 1 : have enough nfts for the caller to mint
     require(
       totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs!"
     );
     // test 2 : the caller has requested to mint more than 0 and less than the min the maxi nbre of nft allowed per transac
     require(
       _count > 0 && _count <= MAX_PER_MINT, 
       "Cannot mint specified number of NFTs."
     );
     // test 3 : the caaller has sent enough ether to mint the requested nbre of mint 
     require(
       msg.value >= PRICE.mul(_count), 
       "Not enough ether to purchase NFTs."
     );
     
     for (uint i = 0; i < _count; i++) {
            _mintSingleNFT();
     }
}
// Presale mints
//fonction qui n'autorise que les adresses autorisées à créer.
function preSale(uint _count, bytes32 hash, bytes memory signature) public payable {
    uint totalMinted = _tokenIds.current();   
    require(totalMinted.add(_count) <= MAX_SUPPLY, 
            "Not enough NFTs left!");
           //test to check if addr of the signer is allowed 
    require(recoverSigner(hash, signature) == owner(), 
            "Address is not allowlisted");
    require(!signatureUsed[signature], 
            "Signature has already been used.");
    for (uint i = 0; i < _count; i++) {
        _mintSingleNFT();
    }
    //track  signature has already been used to mint
    signatureUsed[signature] = true;
}
function _mintSingleNFT() private {
  //get the current ID that hasn’t been minted yet
      uint newTokenID = _tokenIds.current();
      //assign the NFT ID to the account that called the function using _safemint
      _safeMint(msg.sender, newTokenID);
      // increment the token IDs counter by 1
      _tokenIds.increment();
}
//to know which NFTs each user holds
// return how many tokens a particular owner holds

    function tokensOfOwner(address _owner) external view returns (uint[] memory) {

        uint tokenCount = balanceOf(_owner);
        uint[] memory tokensId = new uint256[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }
        function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
// to withdraw the contract’s entire balance
      function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
    // The following functions are overrides required by Solidity.

       function count() public view returns (uint256) {
        return _tokenIds.current();
    }
   function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

function MintERC721 ( address to, string memory hash, string memory metadata) public onlyOwner returns (uint256){
    require(hashes[hash] !=1);
    hashes[hash]= 1;
    _tokenIdCounter.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(to, newItemId);
    _setTokenURI(newItemId, metadata);
    return newItemId;
}

function payToMint(address recipient,string memory metadataURI ) public payable returns (uint256) {
    
        require(existingURIs[metadataURI] != 1, 'NFT already minted!');
        require (msg.value >= 0.05 ether, 'Need to pay up!');

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);
        return newItemId;
    }

function buyNft(uint tokenId) public payable {
  
    uint price = _idToNftItem[tokenId].price;
    address owner = ERC721.ownerOf(tokenId);

    require(msg.sender != owner, "You already own this NFT");
    require(msg.value == price, "Please submit the asking price");

    _idToNftItem[tokenId].isListed = false;
    _listedItems.decrement();

    _transfer(owner, msg.sender, tokenId);
    payable(owner).transfer(msg.value);
  }

}