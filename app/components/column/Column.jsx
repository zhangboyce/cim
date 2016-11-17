'use strict';

import React, {Component, PropTypes} from 'react';
import ColumnImg from './ColumnImg.jsx';
import ColumnName from './ColumnName.jsx';
import ColumnTag from './ColumnTag.jsx';
import ColumnDetail from './ColumnDetail.jsx';

import _ from 'lodash';

export default class Column extends Component {

    render() {
        const { column } = this.props;
        return (
            <div className="column shadow">
                <ColumnImg column={ column }/>
                <div className="column-detail">
                    <ColumnName column={ column } />
                    <ColumnTag column={ column } />
                    <ColumnDetail column={ column } />
                </div>
            </div>
        );
    }
};

Column.propTypes = {
    column: PropTypes.object.isRequired
};