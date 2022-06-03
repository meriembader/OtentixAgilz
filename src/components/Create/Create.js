import React, {useState } from 'react';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
require('dotenv').config();

function Create()  {
    const [file, setFile] = useState()
    const [myipfsHash, setIPFSHASH] = useState('')
   const handleFile=async (fileToHandle) =>{
    console.log('starting')
    // initialize the form data
    const formData = new FormData()
    // append the file form data to 
    formData.append("file", fileToHandle)
console.log("choosen file", fileToHandle)
    // call the keys from .env
    const API_KEY = process.env.REACT_APP_API_KEY
    const API_SECRET = process.env.REACT_APP_API_SECRET

    // the endpoint needed to upload the file
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`
    const response = await axios.post(
        url,
        formData,
        {
            maxContentLength: "Infinity",
            headers: {
                pinata_api_key: '1500252925f330916fad',
                pinata_secret_api_key: '9ad46efc7ca8ded9ebf1b14ddd3c24fc17caddaf17360fb0d48ffd65b66cfdc4'
            }
        }
    )
    console.log("this is the response of pining file ", response.data)
    // get the hash
    setIPFSHASH(response.data.IpfsHash)
    }
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
                                <div className="row">
                                    <div className="col-12">
                                        <div>
                                        {
//  render the hash
              myipfsHash.length > 0 && <img height='80' src={`https://otentix.mypinata.cloud/ipfs/${myipfsHash}`} alt='not loading'/>
}
                                        </div>
                                        <br>
                                        </br>
                                        <div className="input-group form-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="inputGroupFile01"onChange={(event)=>setFile(event.target.files[0])}/>
                                              <img src={file}></img>
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>

                                            </div>
                                        </div>
                                    </div>
                                        
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4"onClick={()=>handleFile(file)} type="submit">Create Item</button> 
                                    </div>
                                </div>
   
                        </div>
                    </div>
                </div>
            </section>
        );
   
}

export default Create;