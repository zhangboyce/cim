'use strict';

import React, {Component, PropTypes} from 'react';
import ColumnStatus from './ColumnStatus.jsx';
import _ from 'lodash';

export default class ColumnName extends Component {

    render() {
        const { name } = this.props;
        return (
            <div className="column-name-status">
                <div className="column-name">{ name }</div>
                { this.props.children }
            </div>
        );
    }
};

ColumnName.propTypes = {
    name: PropTypes.string
};