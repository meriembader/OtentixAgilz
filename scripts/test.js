const { utils } = require("ethers");
const hre = require("hardhat");
async function main() {
    const baseTokenURI = "ipfs://Qmf2kq9RaoQobYYb2Bzpv2zNGDVft4tuf6k7znSGV2k86f/";

    const contractFactory = await hre.ethers.getContractFactory("Otentix");
    const contract = await contractFactory.deploy(baseTokenURI);
   // Wait for this transaction to be mined
   await contract.deployed();

   // Get contract address
   console.log("Contract deployed to:", contract.address);
};