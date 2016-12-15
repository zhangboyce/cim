'use strict';

import React, {Component, PropTypes} from 'react';

export default class HotColumnList extends Component {

    render() {
        const { hotColumns } = this.props;
        let largeColumn = hotColumns[0];
        let smallTopColumn = hotColumns[1];
        let smallBottomColumn = hotColumns[2];

        return (
            <div className="hot-column-list">
                <div className="large-column shadow">
                    <img src={`/public/imgs/columns/${largeColumn.name}.png`} />
                    <div className="column-info">
                        <div className="title">{ largeColumn.name }</div>
                        <div className="detail">
                            <p>栏目类型: { largeColumn.types && largeColumn.types.join(' / ')}</p>
                            <p>栏目时长: { largeColumn.time }</p>
                            <p>栏目简介: { largeColumn.description && largeColumn.description.substring(0, 70) }... ...</p>
                        </div>
                    </div>
                </div>
                <div className="small-column shadow">
                    <img src={`/public/imgs/columns/${smallTopColumn.name}.png`} />
                    <div className="column-title"> { smallTopColumn.name } </div>
                </div>
                <div className="small-column bottom-small-column shadow">
                    <img src={`/public/imgs/columns/${smallBottomColumn.name}.png`} />
                    <div className="column-title"> { smallBottomColumn.name }</div>
                </div>
            </div>
        );
    }
};

HotColumnList.propTypes = {
    hotColumns: PropTypes.array.isRequired
};