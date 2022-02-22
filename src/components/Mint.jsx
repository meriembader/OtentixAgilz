import React, { Component } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Otentix from '../artifacts/contracts/Otentix.sol/Otentix.json';

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();
console.log("this is the signer", signer);
console.log("this is the  Otentix.abi", Otentix.abi);
console.log("this is the  contractAddress",contractAddress);
// get the smart contract
const contract = new ethers.Contract(contractAddress, Otentix.abi, signer);

export default class Mint extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.mintTokens = this.mintTokens.bind(this);
        this.state = {
            imgCollection: ''
        }
    }
    onFileChange(e) {
        this.setState({ imgCollection: e.target.files })
    }
    onSubmit(e) {
        e.preventDefault()
        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('imgCollection', this.state.imgCollection[key])
        }
        axios.post("#", formData, {
        }).then(res => {
            console.log(res.data)
        })
    }
    mintTokens = async () => {
        const connection = contract.connect(signer);
        const addr = connection.address;
        console.log("contract address====>",addr);
     ///   console.log("metadate uri=====>", metadataURI);
        const result = await contract.mintNft(addr, _mintAmount, {
          value: ethers.utils.parseEther('0.05'),
        });
    
        await result.wait();
       console.log( "this is the result after mintNFT", result)
      };
    render() {
        return (
            
            <div className="container">
                  <WalletBalance />
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary"  onClick={this.mintTokens}>Mint</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}