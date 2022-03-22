import React, { Component } from 'react';

class metamask extends Component {
 
    render() {
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>Connect and Unlock with MetaMask</span>
                             
                                <p>After you've connected, follow the instructions on the screen to access your account</p>
                            </div>
                            {/* Item Form */}
                         
                              
                                  
                                <div class="card single-wallet">
                                       
                                            
                                            <img className="metamask" src="/img/metamask.png" alt="" />  
                                            <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Connect to MetaMask</button>
                                       
                             
                                  
                                   
                                </div>
                                </div>
                                
                        </div>
                        </div>
                        </div>
             
            </section>
        );
    }
}

export default metamask;