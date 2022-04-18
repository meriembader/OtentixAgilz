import React,{ useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Otentix from '../../artifacts/contracts/Otentix.sol/Otentix.json';
import QrSigner from '@susy-js/qr-signer'
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
//const contractAddress = process.env.contractAddress;
const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();
console.log("this is the signer", signer);
console.log("this is the  Otentix.abi", Otentix.abi);
console.log("this is the  contractAddress",contractAddress);
// get the smart contract
const contract = new ethers.Contract(contractAddress, Otentix.abi, signer);

function ExploreOne()  {
  
    const [totalMinted, setTotalMinted] = useState(0);
    useEffect(() => {
        getCount();
      }, []);
      const getCount = async () => {
        //console.log("iciiiiiiiii ::::::::::::::::::::");
        const count = await contract.count();
        console.log("iciiiiiiiii ::::::::::::::::::::",count);
        console.log("thiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiis countt",parseInt(count));
        setTotalMinted(parseInt(count));
      };
      return (
        <div>
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
        const contentId = 'QmYNuGHzCj95qa2ZiDmC4vGPSPwmbH3H9avW4gpuzfNGm4';
        const metadataURI = `${contentId}/${tokenId}.json`;
        console.log("==============+=========>", tokenId)
        const imageURI = `https:ipfs.io/ipfs/${contentId}/${tokenId}.png`;
        //const imageURI = `img/${tokenId}.png`;
      
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
        const [scan, setScan] = useState(0);
        const [signature, setSignature] = useState(0);
        if (signature) {
            return <div>Signature: {signature}</div>;
          }
        return (
            <section className="explore-area load-more p-0">
                <div className="container">
                   
                    <div className="row items">     
                                <div className="col-12 col-sm-6 col-lg-3 item">
                                    <div className="card">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'} alt="" />
                                            </a>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <a href="/item-details">
                                                    <h5 className="mb-0"></h5>
                                                </a>
                                                <div className="seller d-flex align-items-center my-3">
                                                <h5 className="card-title">ID #{tokenId}</h5>
                                                {!isMinted ? (
                                                    <button className="btn btn-primary" onClick={mintToken}>
                                                        Mint
                                                    </button>
                                                    ) : (
                                                    <button className="btn btn-bordered-white btn-smaller mt-3"  onClick={() =>({ scan: !scan })}>
                                                        Generate QR Code
                                                    </button>
                                                    )}
                                                </div>
                                                <div>
                                              
                                              
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                       
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <a id="load-btn" className="btn btn-bordered-white mt-5" href="#">more </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

export default ExploreOne;