'use strict';

import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import ColumnImg from './ColumnImg.jsx';
import ColumnName from './ColumnName.jsx';
import ColumnStatus from './ColumnStatus.jsx';
import ColumnTag from './ColumnTag.jsx';
import ColumnDetail from './ColumnDetail.jsx';

import _ from 'lodash';

export default class Column extends Component {

    constructor(props) {
        super(props);
        this.getColumnComponent = this.getColumnComponent.bind(this);
    }

    getColumnComponent(columnName) {
        const { column, type } = this.props;
        return (
            <div className="column shadow">
                <Link to={`/column/${type}/${column._id}`}>
                    <ColumnImg column={ column }/>
                </Link>
                <div className="column-detail">
                    { columnName }
                    { type === "cp" && <ColumnTag column={ column } /> }
                    <ColumnDetail column={ column } />
                </div>
            </div>
        );
    }

    render() {
        const { column, type } = this.props;
        switch (type) {
            // creative planning
            case 'cp':
                return this.getColumnComponent(
                    <ColumnName name={ column.name } >
                        <ColumnStatus column={ column }/>
                    </ColumnName>
                );

            // Advertising Investment
            case 'ai':
                return this.getColumnComponent(
                    <ColumnName name={ column.name } >
                        <div className="column-op">
                            <button type="button">我要赞助</button>
                        </div>
                    </ColumnName>
                );

            // Copyright buy
            case 'cb':
                return this.getColumnComponent(
                    <ColumnName name={ column.name } >
                        <div className="column-op">
                            <span>5W/<em>集</em></span>
                            <button type="button">点击购买</button>
                        </div>
                    </ColumnName>
                );
            default:
                return this.getColumnComponent(
                    <ColumnName name={ column.name } >
                        <ColumnStatus column={ column }/>
                    </ColumnName>
                );

        }
    }
};

Column.propTypes = {
    column: PropTypes.object.isRequired,
    type: PropTypes.string
};