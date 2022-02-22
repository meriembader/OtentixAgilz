import WalletBalance from './WalletBalance';
import React, {  useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Otentix from '../artifacts/contracts/Otentix.sol/Otentix.json';

const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();
console.log("this is the signer", signer);
console.log("this is the  Otentix.abi", Otentix.abi);
console.log("this is the  contractAddress",contractAddress);
// get the smart contract
const contract = new ethers.Contract(contractAddress, Otentix.abi, signer);

const Mint = () => {
    const [files, setFiles] = useState('');
   
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);
    //state for checking file size
   // const [fileSize, setFileSize] = useState(true);
    // for file upload progress message
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    //for displaying response message
    const [fileUploadResponse, setFileUploadResponse] = useState(null);




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
        fetch(FILE_UPLOAD_BASE_ENDPOINT+'/upload', requestOptions)
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
            });
        setFileUploadProgress(false);
      };
   
    const  mintTokens = async () => {
        setFeedback("Minting your Nerdy Coder Clone...");
        setClaimingNft(true);
        const _amount = 1;
        const connection = contract.connect(signer);
        const addr = connection.address;
        console.log("contract address====>",addr);
     ///   console.log("metadate uri=====>", metadataURI);
        const result = await contract.mintNft(addr, _amount, {
          value: ethers.utils.parseEther("0.05"),
        });
       /* .once("error", (err) => {
            console.log(err);
            setFeedback("Sorry, something went wrong please try again later.");
            setClaimingNft(false);
          })
          .then((receipt) => {
            setFeedback(
              "WOW, you now own a Nerdy Coder Clone. go visit Opensea.io to view it."
            );
            setClaimingNft(false);
           // dispatch(fetchData(Contract.account));
          });*/
    
        await result.wait();
       console.log( "this is the result after mintNFT", result)
      };
  
    return(

      <form onSubmit={fileSubmitHandler}>
          <h1>NFT</h1>
         <input type="file"  multiple onChange={MintHandler}/>
         <button  className="btn btn-primary"  onClick={mintTokens}>mint</button>
      
      
      </form>

    );

}
export default Mint;
