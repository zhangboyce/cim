'use strict';

import React, {Component, PropTypes} from 'react';

export default class ColumnList extends Component {

    render() {
        const { columns } = this.props;

        return (
            <div className="column-list">
                XXOO
            </div>
        );
    }
};

ColumnList.propTypes = {
    columns: PropTypes.array.isRequired
};