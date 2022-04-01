import React, { Component } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { ethers } from 'ethers';
import getWeb3 from '../utils/getWeb3';
import ipfs from '../utils/ipfs';
import Otentix from '../../artifacts/contracts/Otentix.sol/Otentix.json';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();



class Create extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          ipfsHash: '',
          web3: null,
          buffer: null,
          account: null
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
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
      }
      onSubmit(event) {
        event.preventDefault()
        ipfs.files.add(this.state.buffer, (error, result) => {
          if(error) {
            console.error(error)
            return
          }
          this.OtentixInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
            return this.setState({ ipfsHash: result[0].hash })
            console.log('ifpsHash', this.state.ipfsHash)
          })
        })
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
                                                <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="name" placeholder="Item Name"  />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea className="form-control" name="textarea" placeholder="Description" cols={30} rows={3} defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="price" placeholder="Item Price"  />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="royality" placeholder="Royality"  />
                                        </div>
                                    </div>
                                   
                                  
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Item</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Create;