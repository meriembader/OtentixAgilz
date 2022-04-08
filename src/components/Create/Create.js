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

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();

class Create extends Component {
  pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      //making axios POST request to Pinata 

 return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key:  "78fb0ae226b2a0f74044",
                pinata_secret_api_key: "35cb7148151e5af3b291c47560e9b8ea61547c38f02c34838bcf0d2d73d554cb",
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
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
  
    constructor(props) {
        super(props)
    
        this.state = {
          ipfsHash: '',
          web3: null,
          buffer: null,
          account: null,
          file: null
        }
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.
    
        getWeb3
        .then(results => {
          this.setState({
            web3: results.web3
          })
    
          // Instantiate contract once web3 provided.
          this.instantiateContract()
        })
        .catch(() => {
          console.log('Error finding web3.')
        })
      }
      instantiateContract() { 
     
           // then print response status
    // get the smart contract
    const contract = new ethers.Contract(contractAddress, Otentix.abi, signer);
    contract.setProvider(this.state.web3.currentProvider)

     // Get accounts.
     this.state.web3.eth.getAccounts((error, accounts) => {
        Otentix.deployed().then((instance) => {
          this.OtentixInstance = instance
          this.setState({ account: accounts[0] })
          // Get the value from the contract to prove it worked.
          return this.OtentixInstance.get.call(accounts[0])
        }).then((ipfsHash) => {
          // Update state with the result.
          return this.setState({ ipfsHash })
        })
      })
      }
      captureFile(event) {
        event.preventDefault()
        const file = event.target.files[0]
        this.setState({...this.state, file:file})
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
      }
      onSubmit (event) {
        event.preventDefault()
        let data = new FormData();
        data.append('file',(this.state.file));
           ipfs(this.state.buffer, data).then((result) => console.log("this is resultttttt", result))
          
    /*   ipfs.files.add(this.state.buffer, (error, result) => {
          this.OtentixInstance.UploadToIPFS(result[0].hash, { from: this.state.account }).then((r) => {
           
            return this.setState({ ipfsHash: result[0].hash }, console.log('ifpsHash', this.state.ipfsHash));
     
          })
        })*/
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