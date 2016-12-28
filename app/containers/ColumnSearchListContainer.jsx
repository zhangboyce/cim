'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import * as ColumnActions from '../actions/column';
import ColumnList from '../components/column/ColumnList.jsx';
import SpinLoading from '../components/common/SpinLoading.jsx';
import SearchBarContainer from './../containers/SearchBarContainer.jsx';
import ScrollPagination from '../components/common/ScrollPagination.jsx';

import _ from 'lodash';

class ColumnSearchListContainer extends Component {

    componentWillMount() {
        this.query(this.props.params);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.params != nextProps.params) this.query(nextProps.params);
    }

    query = (params, page=1) => {
        let keyword = params.keyword;
        let types = params.types;
        let times = params.times;
        let status = params.status;
        let sort = params.sort;

        let pageSize = this.props.searchColumns.pageSize;

        let query = { page, pageSize, keyword, types, times, status, sort };
        this.props.actions.searchColumns(query, this.props.token);
    };

    nextPage = page => {
        this.query(this.props.params, page);
    };

    hasNextPage = () => {
        let searchColumns = this.props.searchColumns;
        return searchColumns.reloaded && (searchColumns.list.length % searchColumns.pageSize == 0);
    };

    render() {
        let searchColumns = this.props.searchColumns;
        return (
            <div className="search-column-list-container">
                <SearchBarContainer />
                <ScrollPagination next={ this.nextPage } hasNext={ this.hasNextPage }>
                    <div className="column-list-container">
                        { !searchColumns.reloaded &&  <SpinLoading /> }
                        { searchColumns.reloaded && searchColumns.list.length == 0  && <div> No results! </div> }
                        { searchColumns.reloaded && searchColumns.list.length != 0 && <ColumnList columns={ searchColumns.list } type="cp" /> }
                    </div>
                </ScrollPagination>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        searchColumns: state.searchColumns,
        token: state.user.auth.token
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
)(withRouter(ColumnSearchListContainer));

