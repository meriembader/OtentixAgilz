import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Otentix from '../artifacts/contracts/Otentix.sol/Otentix.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();
console.log("this is the signer", signer);
console.log("this is the  Otentix.abi", Otentix.abi);
console.log("this is the  contractAddress",contractAddress);
// get the smart contract
const contract = new ethers.Contract(contractAddress, Otentix.abi, signer);


function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
   
    getCount();
  }, []);

  const getCount = async () => {
    //console.log("iciiiiiiiii ::::::::::::::::::::");
    const count = await contract.count();
    console.log("iciiiiiiiii ::::::::::::::::::::",count);
    console.log("thiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiis",parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1> NFT Collection</h1>
      <div className="container">
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'Qma9YUEwTzUrbKVfCoRuSuMiDDkHf31Wggb8C8C6zddDZd';
  const metadataURI = `${contentId}/${tokenId}.json`;
  console.log("==============+=========>", tokenId)
  //const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}`;
  const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log('iciiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    console.log("contract address====>",addr);
    console.log("metadate uri=====>", metadataURI);
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          <button className="btn btn-primary" onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
