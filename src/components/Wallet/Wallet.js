import React, { Component, useEffect, useState   } from 'react';




class Activity extends Component {



    render() {
        return (
            <section className="wallet-connect-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>Wallet Connect</span>
                                <h3 className="mt-3 mb-0">Connect your Wallet</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center items">
                       
                            
                                <div  className="col-12 col-md-6 col-lg-4 item">
                                    {/* Single Wallet */}
                                    <div className="card single-wallet">
                                        <a className="d-block text-center"href="/Metamask" >
                                            <img className="avatar-lg" src="/img/metamask.png" alt="" />
                                            <h4 className="mb-0">MetaMask</h4>
                                            <p>A browser extension with great flexibility. The web's most popular wallet</p>
                                        </a>
                                    </div>
                                </div>
                                 <div  className="col-12 col-md-6 col-lg-4 item">
                                 {/* Single Wallet */}
                                 <div className="card single-wallet">
                                     <a className="d-block text-center" href="/login">
                                         <img className="avatar-lg" src="/img/authereum.png" alt="" />
                                         <h4 className="mb-0">Authereum</h4>
                                         <p>A user-friendly wallet that allows you to sign up with your phone number on any device</p>
                                     </a>
                                 </div>
                             </div>
                        
                             <div  className="col-12 col-md-6 col-lg-4 item">
                                 {/* Single Wallet */}
                                 <div className="card single-wallet">
                                     <a className="d-block text-center" href="/login">
                                         <img className="avatar-lg" src="/img/WalletConnect.png" alt="" />
                                         <h4 className="mb-0">WalletConnect</h4>
                                         <p>Pair with Trust, Argent, MetaMask & more. Works from any browser, without an extensio</p>
                                     </a>
                                 </div>
                             </div>
                        
                             <div  className="col-12 col-md-6 col-lg-4 item">
                                 {/* Single Wallet */}
                                 <div className="card single-wallet">
                                     <a className="d-block text-center" href="/login">
                                         <img className="avatar-lg" src="/img/Dapper.png" alt="" />
                                         <h4 className="mb-0">Dapper</h4>
                                         <p>A security-focused cloud wallet with pin codes and multi-factor authentication</p>
                                     </a>
                                 </div>
                             </div>
                             <div  className="col-12 col-md-6 col-lg-4 item">
                                 {/* Single Wallet */}
                                 <div className="card single-wallet">
                                     <a className="d-block text-center" href="/login">
                                         <img className="avatar-lg" src="/img/kaikas.png" alt="" />
                                         <h4 className="mb-0">kaikas</h4>
                                         <p>A simple-to-use wallet that works on both mobile and through a browser extension</p>
                                     </a>
                                 </div>
                             </div>
                        
                    </div>
                </div>
            </section>
        );
    }
}

export default Activity;