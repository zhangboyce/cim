'use strict';

import React, {Component, PropTypes} from 'react';
import ColumnStatus from './ColumnStatus.jsx';
import _ from 'lodash';

export default class ColumnName extends Component {

    render() {
        const { column } = this.props;
        return (
            <div className="column-name-status">
                <div className="column-name">{ column.name }</div>
                <ColumnStatus column={ column }/>
            </div>
        );
    }
};

ColumnName.propTypes = {
    column: PropTypes.object.isRequired
};