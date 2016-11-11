'use strict';

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory } from 'react-router';
import ColumnSearchModal from './../components/column/ColumnSearchModal.jsx';
import SearchInput from './../components/common/SearchInput.jsx';
import * as ColumnActions from '../actions/column';

export default class SearchBarContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {keyword: ''}
    }
    handleClearKeyword() {
        this.setState({keyword: ''});
    }
    handleChange(keyword) {
        this.setState({keyword: keyword});
    }

    componentWillMount() {
        this.props.actions.listColumnSearchTags();
    }

    handleSelectTag(name, value) {
        this.props.actions.toggleColumnSearchTag(name, value);
    }

    render() {
        const { columnFilters } = this.props;
        return (
            <div>
                <div className="search-bar">
                    <div className="col-sm-3 col-input">
                        <SearchInput onChange={ this.handleChange.bind(this) }
                                     keyword={ this.state.keyword }
                                     onClearKeyword={ this.handleClearKeyword.bind(this) }/>
                    <span>
                        <a data-toggle="modal" data-target=".column-search-modal" href="javascript:;">高级搜索</a>
                    </span>
                    </div>
                </div>
                {
                    columnFilters &&
                    <ColumnSearchModal columnFilters={ columnFilters }
                                       handleSelectTag={ this.handleSelectTag.bind(this) }/>
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        columnFilters: state.columnFilters
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