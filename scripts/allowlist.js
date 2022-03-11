const ethers = require('ethers');
const main = async () => {
    const allowlistedAddresses = [
        '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
        '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
        '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
        '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
        '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
    ];
//  const owner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    //ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
    const privateKey = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  //====>  // àfaire : voir si ether.wallet s'il accepte autre arg or la privateKey?!!!!!
    const signer = new ethers.Wallet(privateKey);
    console.log("this is the signer", signer)
    console.log("thiis is signer address",signer.address)
   // Get first allowlisted address
//let message = allowlistedAddresses[0];
let message = "Hello agilz";
console.log("this is the message ", message)
// Compute hash of the address
let messageHash = ethers.utils.id(message);
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
console.log("Message was signed by: ", recover.toString());
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