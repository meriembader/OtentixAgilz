import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Otentix from '../artifacts/contracts/Otentix.sol/Otentix.json';

const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F';

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
               <NFTImage tokenId={i} getCount={getCount} />
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
 // const imageURI = `https://ipfs.io/ipfs/${metadataURI}`;
  const [files, setFiles] = useState('');
   
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);
    //state for checking file size
   // const [fileSize, setFileSize] = useState(true);
    // for file upload progress message
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    //for displaying response message
    const [fileUploadResponse, setFileUploadResponse] = useState(null);


/** Upload Files  */


const MintHandler = (event) => {
  setFiles(event.target.files);
 };

const fileSubmitHandler = (event) => {
 event.preventDefault();
//  setFileSize(true);
 setFileUploadProgress(true);
 setFileUploadResponse(null);

  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
      if (files[i].size > 1024){
        //  setFileSize(false);
          setFileUploadProgress(false);
          setFileUploadResponse(null);
          return;
      }

      formData.append(`files`, files[i])
  }

  const requestOptions = {
      method: 'POST',
      body: formData
  };
  /*fetch(FILE_UPLOAD_BASE_ENDPOINT+'/upload', requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();

          // check for error response
          if (!response.ok) {
              // get error message
              const error = (data && data.message) || response.status;
              setFileUploadResponse(data.message);
              return Promise.reject(error);
          }

         console.log(data.message);
         setFileUploadResponse(data.message);
      })
      .catch(error => {
          console.error('Error while uploading file!', error);
      });*/
  setFileUploadProgress(false);
};



  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log('metadarauri ==> ',metadataURI)
    console.log('is minted ??!!== > look here ',result)
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

/*  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }*/
  return (

    
    <div className="card" style={{ width: '18rem' }}>
      <form onSubmit={fileSubmitHandler}>
          <h1>NFT</h1>
          <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          
          <button className="btn btn-primary" onClick={mintToken}>
            Mint1
          </button>
        ) : (
         <button className="btn btn-secondary" >
            Taken! Show URI
          </button>
        )}   
      </div>
         <input type="file"  multiple onChange={MintHandler}/>
         <button  className="btn btn-primary"  onClick={mintToken}>mint</button>
      
      
      </form>
    
    </div>
  );
}

export default Home;
