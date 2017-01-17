'use strict';

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import ColumnSearchModal from './../components/column/ColumnSearchModal.jsx';
import SearchInput from './../components/common/SearchInput.jsx';
import * as ColumnActions from '../actions/column';

import _ from 'lodash';

class SearchBarContainer extends Component {

    componentWillMount() {
        this.props.actions.listColumnSearchTags(this.props.token);
    }

    handleChange = keyword => {
        this.props.actions.addColumnSearchKeyword(keyword);
    };

    handleSelectTag = (name, value) => {
        this.props.actions.toggleColumnSearchTag(name, value);
    };

    handleSearch = () => {
        const { columnFilters } = this.props;
        let selected = columnFilters.selected;

        if (columnFilters.keyword || _.some(selected, s => s && s.length != 0)) {
            let keyword = columnFilters.keyword || '';
            let times  =  (selected['时长'] && selected['时长'].join(',')) || '';
            let types  =  (selected['类型'] && selected['类型'].join(',')) || '';
            let status =  (selected['状态'] && selected['状态'].join(',')) || '';
            let sort   =  (selected['分类'] && selected['分类'].join(',')) || '';

            browserHistory.push(`/column/search/keyword=${keyword}&times=${times}&types=${types}&status=${status}&sort=${sort}`);
        }
    };

    render() {
        const { columnFilters } = this.props;
        let keyword = columnFilters.keyword;
        return (
            <div>
                <div className="search-bar">
                    <div className="col-sm-3 col-input">
                        <SearchInput onChange={ this.handleChange }
                                     keyword={ keyword }
                                     onSearch={ this.handleSearch }/>
                    <span>
                        <a data-toggle="modal" data-target=".column-search-modal" href="javascript:;">高级搜索</a>
                    </span>
                    </div>
                </div>
                {
                    columnFilters &&
                    <ColumnSearchModal columnFilters={ columnFilters }
                                       onSearch={ this.handleSearch }
                                       onChange={ this.handleChange }
                                       onSelectTag={ this.handleSelectTag }/>
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        columnFilters: state.columnFilters,
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
)(withRouter(SearchBarContainer));