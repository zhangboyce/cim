'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App.jsx';

import Banner from './components/layout/Banner.jsx';
import SearchBarContainer from './containers/SearchBarContainer.jsx';
import HotColumnContainer from './containers/HotColumnContainer.jsx';
import CooperativeUnitContainer from './containers/CooperativeUnitContainer.jsx';
import ColumnListContainer from './containers/ColumnListContainer.jsx';
import ColumnSearchListContainer from './containers/ColumnSearchListContainer.jsx';
import ColumnDetailContainer from './containers/ColumnDetailContainer.jsx';
import UserContainer from './containers/UserContainer.jsx';
import RegisterContainer from './containers/RegisterContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import ForgetPasswordContainer from './containers/ForgetPasswordContainer.jsx';
import ResetPasswordContainer from './containers/ResetPasswordContainer.jsx';

import { requireAuthentication } from './containers/AuthenticatedComponentContainer.jsx';

import configureStore from './store/configureStore'
import { loginUserSuccess } from './actions/user';

import config from '../common/config';
config.set(window.CONFIG);

let store = configureStore();

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

const Index = class extends Component {
    render() {
        return (
            <div>
                <Banner />
                <SearchBarContainer />
                <HotColumnContainer />
                <CooperativeUnitContainer />
            </div>
        );
    }
};

const ColumnListContainerWithBanner = class extends Component {
    render() {
        return (
            <div>
                <Banner />
                <SearchBarContainer />
                <ColumnListContainer {...this.props}/>
            </div>
        );
    }
};

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ requireAuthentication(Index) } />
                <Route path="column/:type" component={ requireAuthentication(ColumnListContainerWithBanner) } />
                <Route path="column/search/:keyword" component={ requireAuthentication(ColumnSearchListContainer) } />
                <Route path="column/:type/:_id" component={ requireAuthentication(ColumnDetailContainer) } />
                <Route path="user" component={ UserContainer }>
                    <Route path="register" component={ RegisterContainer } />
                    <Route path="login" component={ LoginContainer } />
                    <Route path="forgetPassword" component={ ForgetPasswordContainer } />
                    <Route path="resetPassword/:validCode" component={ ResetPasswordContainer } />
                </Route>
            </Route>
        </Router>
    </Provider>, document.getElementById('app'));
