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
import ColumnDetailContainer from './containers/ColumnDetailContainer.jsx';

import configureStore from './store/configureStore'

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

ReactDOM.render(
    <Provider store={ configureStore() }>
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Index } />
                <Route path="column/:type" component={ ColumnListContainer } />
                <Route path="column/:type/:id" component={ ColumnDetailContainer } />
            </Route>
        </Router>
    </Provider>, document.getElementById('app'));
