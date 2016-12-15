'use strict';

import React, { Component, PropTypes } from 'react';
import SearchInput from './../common/SearchInput.jsx';
import _ from 'lodash';
import classnames from 'classnames'

export default class ColumnSearchModal extends Component {

    constructor(props) {
        super(props);
        this.state = {keyword: ''}
    }


    handleChange = keyword => {
        this.setState({keyword: keyword});
    };

    tags() {
        const { columnFilters, onSelectTag } = this.props;
        let list = columnFilters.list;
        let selected = columnFilters.selected;

        return _.map(list, tag => {
            return <div key={ tag.name }>
                <span className="name"><em>{ tag.name }</em>:</span>
                {
                    _.map(tag.values, value => {
                        return (
                            <span key={ value }>
                                <a href="javascript:;"
                                   onClick={ ()=> { onSelectTag(tag.name, value) } }
                                   className={ classnames({
                                        selected: selected[tag.name] && selected[tag.name].findIndex(v => v == value) != -1
                                }) }>{ value }</a>
                            </span>
                        )
                    })
                }
            </div>
        })
    }

    handleSearch = () => {
        console.log(JSON.stringify(this.props.columnFilters.selected));
        console.log(this.state.keyword);
    };

    render() {
        return (
            <div className="column-search-modal modal fade" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="column-search-input">
                                <SearchInput onChange={ this.handleChange }
                                             keyword={ this.state.keyword }
                                             onSearch={ this.handleSearch }/>
                            </div>
                            <div className="column-search-tag">
                                { this.tags() }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={ this.handleSearch }>搜    索</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ColumnSearchModal.propTypes = {
    columnFilters: PropTypes.object.isRequired,
    onSelectTag: PropTypes.func.isRequired
};