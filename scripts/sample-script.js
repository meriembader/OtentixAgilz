const hre = require("hardhat");

async function main() {

  const Otentix = await hre.ethers.getContractFactory("Otentix");
  const nft = await Otentix.deploy();

  await nft.deployed();

  console.log("My NFT deployed to:", nft.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });