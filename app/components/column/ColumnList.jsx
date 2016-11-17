'use strict';

import React, {Component, PropTypes} from 'react';
import Column from './Column.jsx';

import _ from 'lodash';

export default class ColumnList extends Component {

    render() {
        const { columns } = this.props;

        return (
            <div className="column-list">
                {
                    _.map(columns, column => {
                        return (
                            <Column column={ column } />
                        )
                    })
                }
            </div>
        );
    }
};

ColumnList.propTypes = {
    columns: PropTypes.array.isRequired
};