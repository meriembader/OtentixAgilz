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
    console.log("this the int count",parseInt(count));
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
               <NFTImage tokenId={i} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'Qmf2kq9RaoQobYYb2Bzpv2zNGDVft4tuf6k7znSGV2k86f';
  const metadataURI = `${contentId}/${tokenId}.png`;
  console.log("this is the tokenId ====>>", tokenId);
  const imageURI = `https://ipfs.io/ipfs/${metadataURI}`;
  const [files, setFiles] = useState('');
   

    //state for checking file size
   // const [fileSize, setFileSize] = useState(true);
    // for file upload progress message
    const [ setFileUploadProgress] = useState(false);
    //for displaying response message
    const [setFileUploadResponse] = useState(null);


/** Upload Files  */


const fileSubmitHandler = (event) => {
 event.preventDefault();
};


  const [isMinted,setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
    
  }, [isMinted]);

  /*const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log('iciiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',result)
    setIsMinted(result);
  };*/
  const getMintedStatus = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.isContentOwned(metadataURI);
    console.log('metadarauri ==> ',metadataURI)
    console.log('is minted ??!!== > look here ',result)
    setIsMinted(result);
  };

  const MintHandler = (event) => {
    setFiles(event.target.files);
    console.log("gggggggggggggggg",files);
   };
  const mintNftHandler = async () => {
    try {
    const connection = contract.connect(signer);
    const addr = connection.address;
    console.log("contract address====>",addr);
    console.log("metadate uri=====>", metadataURI);
        console.log("Initialize payment");
        let result = await contract.mintNFTs(files.length, { value: ethers.utils.parseEther("0.05") });

        console.log("Mining... please wait");
        await result.wait();
        console.log(`Mined,${result.hash}`)
      } catch (err) {
        console.log("erreuuurrrrrrrrr mint",err);
      }
   
  }

  /*const mintToken = async () => {
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
  };*/

async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (

    
    <div className="card" style={{ width: '18rem' }}>
      <form onSubmit={fileSubmitHandler}>
          <h1>NFT</h1>
          <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
      <div className="card-body">
      <input type="file"  multiple onChange={MintHandler}/>
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
         
         <button  className="btn btn-primary"  onClick={mintNftHandler}>mint</button>
      
      
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
      
      </form>
    
    </div>
  );
}

export default Home;