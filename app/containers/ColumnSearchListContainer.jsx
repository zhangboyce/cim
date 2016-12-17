'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import * as ColumnActions from '../actions/column';
import ColumnList from '../components/column/ColumnList.jsx';
import SearchLoading from '../components/common/SearchLoading.jsx';
import SearchBarContainer from './../containers/SearchBarContainer.jsx';

import _ from 'lodash';

class ColumnSearchListContainer extends Component {

    componentWillMount() {
        this.query(this.props.params);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.params != nextProps.params) this.query(nextProps.params);
    }

    query = params => {
        let keyword = params.keyword;
        let types = params.types;
        let times = params.times;
        let status = params.status;
        let sort = params.sort;

        let query = { keyword, types, times, status, sort };
        this.props.actions.searchColumns(query, this.props.token);
    };

    render() {
        let columns = this.props.columns;
        return (
            <div className="search-column-list-container">
                <SearchBarContainer />
                <div className="column-list-container">
                    { !columns.reloaded &&  <SearchLoading /> }
                    { columns.reloaded && columns.list.length == 0  && <div> No results! </div> }
                    { columns.reloaded && columns.list.length != 0 && <ColumnList columns={ columns.list } type="cp" /> }
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        columns: state.searchColumns,
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

