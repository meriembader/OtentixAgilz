// SPDX-License-Identifier: MIT
pragma solidity >=0.5.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Otentix is ERC721Enumerable, ERC721URIStorage, Ownable {
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
   
constructor(string memory baseURI) ERC721("Otentix", "nft") {
     setBaseURI(baseURI);


}
 function _baseURI() internal 
                    view 
                    virtual 
                    override 
                    returns (string memory) {
     return baseTokenURI;
}
function setBaseURI(string memory _baseTokenURI) public onlyOwner {
     baseTokenURI = _baseTokenURI;
}

    /*
function reserveNFTs() public onlyOwner {
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
function mintNFTs(uint _count, string memory metadataURI) public payable returns(uint) {
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
            _mintSingleNFT(metadataURI);
         //   _setTokenURI(totalMinted, metadataURI);
     }
     return totalMinted;
}

function _mintSingleNFT( string memory uri) private {
  //get the current ID that hasn’t been minted yet
      uint newTokenID = _tokenIds.current();
      //assign the NFT ID to the account that called the function using _safemint
      _safeMint(msg.sender, newTokenID);
      _setTokenURI(newTokenID, uri);
      // increment the token IDs counter by 1
      _tokenIds.increment();
      
}

//to know which NFTs each user holds
// return how many tokens a particular owner holds
function tokensOfOwner(address _owner) 
         external 
         view 
         returns (uint[] memory) {
     uint tokenCount = balanceOf(_owner);
     uint[] memory tokensId = new uint256[](tokenCount);
     for (uint i = 0; i < tokenCount; i++) {
          tokensId[i] = tokenOfOwnerByIndex(_owner, i);
     }

     return tokensId;
}
// to withdraw the contract’s entire balance
function withdraw() public payable onlyOwner {
     uint balance = address(this).balance;
     require(balance > 0, "No ether left to withdraw");
     (bool success, ) = (msg.sender).call{value: balance}("");
     require(success, "Transfer failed.");
}

   function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
       
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

    // The following functions are overrides required by Solidity.

       function count() public view returns (uint256) {
        return _tokenIds.current();
    }
   

}
