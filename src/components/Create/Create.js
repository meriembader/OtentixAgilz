import React, { Component, useState } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { ethers } from 'ethers';
import getWeb3 from '../utils/getWeb3';
import ipfs from '../utils/ipfs';
import { pinJSONToIPFS } from "../utils/pinata";
import Otentix from '../../artifacts/contracts/Otentix.sol/Otentix.json';
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");

require('dotenv').config();


const key = process.env.pinataApiKey;
const secret = process.env.pinataSecretApiKey;


const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();
const myipfsHash=''
const file=null
class Create extends Component {
  state = {
    myipfsHash: '',
    file: null
}

componentDidMount(){
    this.setState({
      myipfsHash: myipfsHash,
      setfile: file
    })
    this.setState({file: "setFile"});
}
    
      
       handleFile=async (fileToHandle) =>{
        console.log('starting')

        
        // initialize the form data
        const formData = new FormData()
    
        // append the file form data to 
        formData.append("file", fileToHandle)
        console.log("this is the file", fileToHandle)

    const API_KEY = process.env.REACT_APP_API_KEY
    const API_SECRET = process.env.REACT_APP_API_SECRET

    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
     url,formData ,
      {
          maxContentLength: "Infinity",
          headers: {
              "Content-Type": `multipart/form-formData;boundary=${formData._boundary}`, 
              pinata_api_key: API_KEY,
              pinata_secret_api_key: API_SECRET

          }
      }
  )
console.log(response)
  // get the hash
  this.state.myipfsHash(response.data.IpfsHash);

       }
     
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
                            <form className="item-form card no-hover" onClick={()=>this.handleFile(file)} >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={(event)=>this.state.file(event.target.files[0])}/>
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