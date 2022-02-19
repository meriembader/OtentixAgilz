/*// SPDX-License-Identifier: MIT
pragma solidity >=0.5.3;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Minter is ERC721Enumerable, Ownable {

  using Strings for uint256;  
  string public baseExtension = ".json";
  uint256 public cost = 100 ether;
  uint256 public maxSupply = 1000;
  uint256 public maxMintAmount = 20;
  bool public paused = false;
  mapping(address => bool) public whitelisted;

  constructor(
    string memory _name,
    string memory _symbol
 
  ) ERC721(_name, _symbol) {

    payToMint(msg.sender, 20);
  }

    function payToMint( address recipient,uint256 _mintAmount )public payable {
       
   uint256 supply = totalSupply();
    require(!paused);
    require(_mintAmount > 0);
    require(_mintAmount <= maxMintAmount);
    require(supply + _mintAmount <= maxSupply);

    if (msg.sender != owner()) {
        if(whitelisted[msg.sender] != true) {
          require(msg.value >= cost * _mintAmount);
        }
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _mint(recipient, supply + i);
    }

    }
}*/