import React, { Component } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { ethers } from 'ethers';
import getWeb3 from '../utils/getWeb3';
import ipfs from '../utils/ipfs';
import { pinJSONToIPFS } from "../utils/ipfs";
import Otentix from '../../artifacts/contracts/Otentix.sol/Otentix.json';
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
require('dotenv').config();

const key = process.env.pinataApiKey;
const secret = process.env.pinataSecretApiKey;

const contractAddress = process.env.contractAddress;
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();

class Create extends Component {

//test if owner already connected to metamask
   connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  
  pinJSONToIPFS = async(JSONBody) => {
    const url = process.env.url;
      //making axios POST request to Pinata 

 return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: process.env.pinataUrl + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
    });
};  
    render() {
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-md-4">
                            {/* Author Profile */}
                            <AuthorProfile />
                        </div>
                        <div className="col-12 col-md-7">
                            {/* Intro */}
                            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                                <div className="intro-content">
                                    <span>Get Started</span>
                                    <h3 className="mt-3 mb-0">Create Item</h3>
                                </div>
                            </div>
                            {/* Item Form */}
                            <form className="item-form card no-hover"  onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.captureFile}/>
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                               
                                            </div>
                                        </div>
                                    </div>
                                   
                            
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Item</button>
                                       
                                    </div>
                                </div>
                            </form>
                            <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Create;