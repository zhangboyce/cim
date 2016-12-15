'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import classnames from 'classnames';

export default class ColumnTag extends Component {

    render() {
        const { column } = this.props;
        let status = column.status || [];
        return (
            <div className="column-tag">
                <span className={ classnames({completed: status.includes('已认播') }) }>已认播</span>
                <span className={ classnames({completed: status.includes('已赞助') }) }>已赞助</span>
                <span className={ classnames({completed: status.includes('招商中') }) }>招商中</span>
                <span className={ classnames({completed: status.includes('制作中') }) }>制作中</span>
            </div>
        );
    }
};

ColumnTag.propTypes = {
    column: PropTypes.object.isRequired
};