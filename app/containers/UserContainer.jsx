'use strict';
import React, {Component, PropTypes} from 'react';

export default class UserContainer extends Component {
    render() {
        return (
            <div className="user-container">
                <img src="/public/imgs/background.png" />
                { this.props.children }
            </div>
        );
    }
}

