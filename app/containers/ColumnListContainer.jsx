'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import * as ColumnActions from '../actions/column';
import Banner from './../components/layout/Banner.jsx';
import SearchBarContainer from './../containers/SearchBarContainer.jsx';
import Title from './../components/layout/Title.jsx';
import ColumnList from '../components/column/ColumnList.jsx';
import ColumnListHeader from '../components/column/ColumnListHeader.jsx';

import $ from 'jquery';
import _ from 'lodash';

class ColumnListContainer extends Component {

    componentWillMount() {
        this.props.actions.listColumns(this.props.token);
    }

    getTitle(type) {
        switch (type) {
            case 'ai':
                return <Title zh_name="广告招商" en_name="Advertising Investment"/>;
            case 'cp':
                return <Title zh_name="创意策划" en_name="Creative Planning"/>;
            case 'cb':
                return <Title zh_name="版权购买" en_name="Copyright Buy"/>;
            default:
                return null;
        }
    }

    render() {
        const { columns, filters, params } = this.props;

        return (
            <div className="column-list-container">
                { this.getTitle(params.type) }
                { filters && <ColumnListHeader filters={ filters } /> }
                { columns.reloaded && <ColumnList columns={ columns.list } type={ params.type } /> }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        columns: state.columns,
        filters: state.columnFilters && state.columnFilters.list,
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
)(withRouter(ColumnListContainer));

