'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import * as ColumnActions from '../actions/column';
import ColumnList from '../components/column/ColumnList.jsx';

import $ from 'jquery';
import _ from 'lodash';

class ColumnSearchListContainer extends Component {

    componentWillMount() {
        this.props.actions.searchColumns(this.props.params.keyword, this.props.token);
    }

    render() {
        let columns = this.props.columns;
        return (
            <div className="column-list-container">
                { columns.reloaded && <ColumnList columns={ columns.list } type="cp" /> }
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

