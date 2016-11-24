'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import * as CommonActions from './actions/common';
import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';

export default class App extends React.Component {

    componentWillMount() {
        this.props.actions.global();
    }

    render () {
        const { global } = this.props;
        return (
            <div className="main">
                { global && <Header global={ global }/> }
                { this.props.children }
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global
    }
};

const mapDispatchToProps = dispath => {
    return {
        actions: bindActionCreators(Object.assign({}, CommonActions), dispath)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));