import React, { Component } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { ethers } from 'ethers';
import Otentix from '../../artifacts/contracts/Otentix.sol/Otentix.json';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get the end user
const signer = provider.getSigner();


// get the smart contract
const contract = new ethers.Contract(contractAddress, Otentix.abi, signer);

class Create extends Component {
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
                            <form className="item-form card no-hover">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="name" placeholder="Item Name" required="required" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea className="form-control" name="textarea" placeholder="Description" cols={30} rows={3} defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="price" placeholder="Item Price" required="required" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="royality" placeholder="Royality" required="required" />
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