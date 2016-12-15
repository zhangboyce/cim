'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class ColumnStatus extends Component {

    render() {
        const { column } = this.props;
        return (
            <div className="column-status">
                <div className="status-i">
                    <i className="fa fa-heart" />
                    <span>{ column.likes }</span>
                </div>
                <div className="status-i">
                    <i className="fa fa-rmb" />
                    <span>5</span>
                </div>
                <div className="status-i">
                    <i className="fa fa-video-camera" />
                    <span>8</span>
                </div>
                <div className="status-i">
                    <i className="fa fa-television" />
                    <span>4</span>
                </div>
            </div>
        );
    }
};

ColumnStatus.propTypes = {
    column: PropTypes.object.isRequired
};