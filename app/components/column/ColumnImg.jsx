'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class ColumnImg extends Component {

    render() {
        const { column } = this.props;
        return (
            <div className="column-img">
                <img src={`/public/imgs/columns/${column.name}.png`} />
            </div>
        );
    }
};

ColumnImg.propTypes = {
    column: PropTypes.object.isRequired
};