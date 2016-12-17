'use strict';

import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import classnames from 'classnames';

export default class ColumnDetail extends Component {

    render() {
        const { column, showInDetail, type } = this.props;
        return (
            <div className="column-desc">
                { column.types && <p>栏目类型: { column.types.join(' / ')}</p> }
                { column.time && <p>栏目时长: { column.time }</p> }
                {
                    column.description &&
                    <p>
                        栏目简介:
                        {showInDetail ? column.description : column.description.substring(0, 20) + '...' }
                        { showInDetail ? null : <Link to={`/column/${type}/${column._id}`}>更多</Link> }
                    </p>
                }
            </div>
        );
    }
};

ColumnDetail.propTypes = {
    column: PropTypes.object.isRequired,
    type: PropTypes.string,
    showInDetail: PropTypes.bool
};