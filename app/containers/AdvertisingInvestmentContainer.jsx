'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import * as ColumnActions from '../actions/column';
import Title from './../components/layout/Title.jsx';
import ColumnList from '../components/column/ColumnList.jsx';
import ColumnListHeader from '../components/column/ColumnListHeader.jsx';

import $ from 'jquery';
import _ from 'lodash';

class AdvertisingInvestmentContainer extends Component {

    componentWillMount() {
        this.props.actions.listColumns();
        this.props.actions.listColumnSearchTags();
    }

    render() {
        const { columns, filters } = this.props;
        return (
            <div className="column-list-container">
                <Title zh_name="广告招商" en_name="Advertising Investment"/>
                { filters && <ColumnListHeader filters={ filters } /> }
                { columns.reloaded && <ColumnList columns={ columns.list } /> }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        columns: state.columns,
        filters: state.columnFilters && state.columnFilters.list
    }
};

const mapDispatchToProps = dispath => {
    return {
        actions: bindActionCreators(Object.assign({}, ColumnActions), dispath)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AdvertisingInvestmentContainer));

