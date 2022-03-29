import React, { Component, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Otentix from '../../artifacts/contracts/Otentix.sol/Otentix.json';
const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Otentix.abi, signer);

function AuctionsOne() {
  
    const [totalMinted, setTotalMinted] = useState(0);
    useEffect(() => {
      getCount();
    }, []);
  
    const getCount = async () => {
      const count = await contract.count();
      console.log(parseInt(count));
      setTotalMinted(parseInt(count));
    };
    
        return (
            <section className="live-auctions-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>Otentix </span>
                                    <h3 className="mt-3 mb-0">List your NFT </h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn" href="/auctions">{this.state.initData.btnText}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="auctions-slides">
                        <div className="swiper-container slider-mid items">
                            <div className="swiper-wrapper">
                                {/* Single Slide */}
                                {Array(totalMinted + 1)
                                  .fill(0)
                                  .map((_, idx) => {
                                    return (
                                        <div key={`auc_${idx}`} className="swiper-slide item">
                                            <div className="card">
                                                <div className="image-over">
                                                    <a href="/item-details">
                                                        <img className="card-img-top" src="" alt="" />
                                                    </a>
                                                </div>
                                                {/* Card Caption */}
                                                <div className="card-caption col-12 p-0">
                                                    {/* Card Body */}
                                                    <div className="card-body">
                                                        <div className="countdown-times mb-3">
                                                            <div className="countdown d-flex justify-content-center" data-date="gggg" />
                                                        </div>
                                                        <a href="/item-details">
                                                            <h5 className="mb-0">hhhh</h5>
                                                        </a>
                                                        <a className="seller d-flex align-items-center my-3" href="/item-details">
                                                            <img className="avatar-sm rounded-circle"  alt="" />
                                                            <span className="ml-2">hhhh</span>
                                                        </a>
                                                        <div className="card-bottom d-flex justify-content-between">
                                                            <span>hhhhh</span>
                                                            <span>hhhhhhhh</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="swiper-pagination" />
                        </div>
                    </div>
                </div>
            </section>
        );
    
}

export default AuctionsOne;