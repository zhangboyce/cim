'use strict';

import React, {Component, PropTypes} from 'react';

export default class ColumnTitle extends Component {

    render() {
        const { zh_name, en_name } = this.props;
        return (
            <div className="container-title">
                <div className="zh_name">{ zh_name }</div>
                <div className="en_name">{ en_name }</div>
                <div className="line"></div>
            </div>
        );
    }
};

ColumnTitle.propTypes = {
    zh_name: PropTypes.string.isRequired,
    en_name: PropTypes.string.isRequired
};