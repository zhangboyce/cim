'use strict';

import React from 'react';
import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import Banner from './components/layout/Banner.jsx';
import SearchBarContainer from './containers/SearchBarContainer.jsx';
import HotColumnContainer from './containers/HotColumnContainer.jsx';
import CooperativeUnitContainer from './containers/CooperativeUnitContainer.jsx';
import AdvertisingInvestmentContainer from './containers/AdvertisingInvestmentContainer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="main">
                <Header />
                <Banner />
                <SearchBarContainer />
                <HotColumnContainer />
                <AdvertisingInvestmentContainer />
                <CooperativeUnitContainer />
                <Footer />
            </div>
        );
    }
}
