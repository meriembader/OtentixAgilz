const hre = require("hardhat");
const fs = require('fs');

async function main() {

  const OtentixMaretPlace = await hre.ethers.getContractFactory("OtentixMaretPlace");
  const Otx = await OtentixMaretPlace.deploy();
  await Otx.deployed();
  console.log("Otx deployed to:", Otx.address);

  fs.writeFileSync('./config.js', `
  export const marketplaceAddress = "${Otx.address}"`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
    
});