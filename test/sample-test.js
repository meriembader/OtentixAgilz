const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Otentix", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const Otentix = await ethers.getContractFactory("Otentix");
    const Otentix = await Otentix.deploy();
    await Otentix.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await Otentix.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await Otentix.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    // wait until the transaction is minted
    await newlyMintedToken.wait();

    balance = await Otentix.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await Otentix.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await Otentix.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
  });
});
