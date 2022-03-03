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

contract Otentix is ERC721Enumerable, Ownable {
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

   function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }


  /*  function mintNft( address _to, uint _mintAmount) public payable{
        require(existingURIs[metadataURI] != 1, 'NFT already minted!');
        uint256 supply = totalSupply();
        require(newItemsId = _tokenIdCounter.current());
          _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;
        require(_mintAmount > 0);
        require ( _mintAmount <=maxMintAmount );
        require( supply + _mintAmount <= maxSupply);
      for ( uint256 i = 1; i <= _mintAmount ; i++){
          _safeMint(_to, supply + i);
           _setTokenURI(newItemsId, metadataURI);
      }
      return newItemsId;
       
    }
  */
 /* function payToMint(address recipient, string memory metadataURI ) public payable returns (uint256) {
        require(existingURIs[metadataURI] != 1, 'NFT already minted!');
        require (msg.value >= 0.1 ether, 'Need to pay up!');
         uint256 supply = totalSupply();
        uint256 newItemsId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;
        require(_mintAmount > 0);
        require ( _mintAmount <=maxMintAmount );
        require( supply + _mintAmount <= maxSupply);
         for ( uint256 i = 1; i <= _mintAmount ; i++){
         _mint(recipient, supply + i);
       
         }
          _setTokenURI(newItemsId, metadataURI);
        return newItemsId;
    }*/


    // The following functions are overrides required by Solidity.



  
       function count() public view returns (uint256) {
        return _tokenIds.current();
    }
   

}
