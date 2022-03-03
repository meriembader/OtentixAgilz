import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Otentix from '../artifacts/contracts/Otentix.sol/Otentix.json';

const contractAddress = '0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44';

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
               <NFTImage/>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const [files, setFiles] = useState('');
  const contentId = 'Qmf2kq9RaoQobYYb2Bzpv2zNGDVft4tuf6k7znSGV2k86f';
  const metadataURI = `${contentId}/${files[0]?.name}`;
  const imageURI = `https://ipfs.io/ipfs/${metadataURI}`;
  

/** Upload Files  */
const fileSubmitHandler = (event) => {
 event.preventDefault();
};


  const [isMinted,setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
    
  }, [isMinted]);


  const getMintedStatus = async () => {    
    const result = await contract.isContentOwned(metadataURI);
    console.log('is minted ??!!== > look here ',result)
    setIsMinted(result);
  };

  const MintHandler = (event) => {
    setFiles(event.target.files);
    console.log("File name here ::=====>", event.target.files[0].name);
   };
  const mintNftHandler = async () => {
    try {
    const connection = contract.connect(signer);
    const addr = connection.address;
    console.log("contract address====>",addr);
    console.log("metadate uri mintHandler*******=====>", metadataURI);
        console.log("Initialize payment");
        let result = await contract.mintNFTs(files.length, metadataURI,
          { value: ethers.utils.parseEther("0.7") });

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
        <h5 className="card-title"> {files[0]?.name}</h5>
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