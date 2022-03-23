import React, {useEffect, useState  } from 'react';
import { useHistory } from "react-router-dom";
const Metamask = (props) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const history = useHistory();                 
  
    const detectProvider = () => {
      let provider;
      if (window.ethereum) {
        provider = window.ethereum;
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else {
        window.alert("No Ethereum browser detected! Check out MetaMask");
      }
      return provider;
    };
  
    const onLoginHandler = async () => {
      const provider = detectProvider();
      if (provider) {
        if (provider !== window.ethereum) {
          console.error(
            "Not window.ethereum provider. Do you have multiple wallet installed ?"
          );
        }
        setIsConnecting(true);
        await provider.request({
          method: "eth_requestAccounts",
        });
        setIsConnecting(false);
        history.push("/wallet-connect")
      }
      history.push("/")
   //   props.onLogin(provider);
    };
  
  
    
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
                                            <button className="btn w-100 mt-3 mt-sm-4" onClick={onLoginHandler} >Connect to MetaMask</button>
                                       
                     
                                  
                                   
                                </div>
                                </div>
                                
                        </div>
                        </div>
                        </div>
             
            </section>
        );
    
}

export default Metamask;