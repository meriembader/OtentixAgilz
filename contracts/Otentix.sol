// SPDX-License-Identifier: MIT
pragma solidity >=0.5.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Otentix is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
  using Strings for uint256;  
    mapping(string => uint8) existingURIs;
   uint256 public maxMintAmount = 20;
       uint256 public cost = 100 ether;
  mapping(address => bool) public whitelisted;
uint256 public maxSupply = 1000;
 

    constructor() ERC721("Otentix", "NFT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function pause() public onlyOwner {
        _pause();
    }
    function unpause() public onlyOwner {
        _unpause();
    }
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
         existingURIs[uri] = 1;
    }

    function mintNft( address _to, uint _mintAmount) public payable{
        uint256 supply = totalSupply();
        require(_mintAmount > 0);
        require ( _mintAmount <=maxMintAmount );
        require( supply + _mintAmount <= maxSupply);

      for ( uint256 i = 1; i <= _mintAmount ; i++){
          _safeMint(_to, supply + i);
      }

    }
  
  function payToMint(address recipient, string memory metadataURI ) public payable returns (uint256) {
        require(existingURIs[metadataURI] != 1, 'NFT already minted!');
        require (msg.value >= 0.05 ether, 'Need to pay up!');
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;
//for (uint256 i= 0; i<= 10 ; i++){
      _mint(recipient, newItemId);
      _setTokenURI(newItemId, metadataURI);
//}
        return newItemId;
    }
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
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
       function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }
       function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
     function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
 
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }


}