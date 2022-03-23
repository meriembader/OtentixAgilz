const ethers = require('ethers');
const main = async () => {
    const hash = [
        'QmdEcRTukQ7rCKP1FopSWMhCZqBFGM7hBB6xgJgBZp5FNk',
        'QmTKvqDUGUEvdxn8FiHB5yrhWdmkd9VeoDSg72dcmCfk4f',
        'QmbCWPGJ9zYHeNgnQ6rz9f83eV84g9uGZrYC5ZJxuSuNY7',
        'QmXnZ39eCTkDmzcWVN74H1scb59JMLMdD54gczgK9HDPmR',
        'QmcbpDCzCkgvpy13nVK75w6DKqtk45gxJLhTg2cuLEvhoH',
    ];
//  const owner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    //ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
    const privateKey = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  //====>  // àfaire : voir si ether.wallet s'il accepte autre arg or la privateKey?!!!!!
    const signer = new ethers.Wallet(privateKey);
    console.log("this is the signer", signer)
    console.log("thiis is signer address",signer.address)
   // Get first allowlisted address
let nft = hash[0];
//let message = "Hello agilz";
console.log("this is the message ", nft)
// Compute hash of the address
let messageHash = ethers.utils.id(nft);
console.log("Message Hash: ", messageHash);

// Sign the hashed address
let messageBytes = ethers.utils.arrayify(messageHash);
let signature = await signer.signMessage(messageBytes);
console.log("Signature: ", signature);

const OtentixFactory = await hre.ethers.getContractFactory('Otentix');
const Otentix = await OtentixFactory.deploy(
    "ipfs://Qmf2kq9RaoQobYYb2Bzpv2zNGDVft4tuf6k7znSGV2k86f/"
);

await Otentix.deployed();

console.log("Contract deployed by: ", signer.address);
recover = await Otentix.recoverSigner(messageHash, signature);
console.log("Message was signed by here verif ( recover): ", recover.toString());
getHash = await Otentix.getHash(recover.toString());
//console.log("message re-crypt :p here ==>", getHash);
}
const runMain = async () => {
    try {
        await main(); 
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();