import React, { Component } from 'react';

import Header from '../components/Header/Header';

import MetamaskConntect from '../components/Wallet/Metamask';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Metamask extends Component {

    
    render() {
        return (
            <div className="main">
                <Header />
               
                <MetamaskConntect />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Metamask;