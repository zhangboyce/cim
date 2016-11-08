'use strict';

import React from 'react';
import Container from './layout/Container.jsx';
import Footer from './layout/Footer.jsx';
import Header from './layout/Header.jsx';
import ToolBar from './layout/ToolBar.jsx';
import Content from './Content.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Header />
                <ToolBar />
                <Container>
                    <Content />
                </Container>
                <Footer />
            </div>
        );
    }
}
