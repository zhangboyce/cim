'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import * as UserActions from './actions/user';
import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';

export default class App extends React.Component {

    render () {
        const { auth } = this.props;
        return (
            <div className="main">
                <Header auth={ auth } onLogout={ this.props.actions.logoutAndRedirect }/>
                { this.props.children }
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.user && state.user.auth
    }
};

const mapDispatchToProps = dispath => {
    return {
        actions: bindActionCreators(Object.assign({}, UserActions), dispath)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));