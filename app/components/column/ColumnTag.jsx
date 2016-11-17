'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import classnames from 'classnames';

export default class ColumnTag extends Component {

    render() {
        const { column } = this.props;
        return (
            <div className="column-tag">
                <span className={ classnames({completed: false}) }>已认播</span>
                <span className={ classnames({completed: true}) }>已赞助</span>
                <span className={ classnames({completed: false}) }>招商中</span>
                <span className={ classnames({completed: true}) }>制作中</span>
            </div>
        );
    }
};

ColumnTag.propTypes = {
    column: PropTypes.object.isRequired
};