'use strict';

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import SearchInput from './../common/SearchInput.jsx';
import _ from 'lodash';
import classnames from 'classnames'

export default class ColumnSearchModal extends Component {

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

    render() {
        const { columnFilters } = this.props;
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
                                <SearchInput onChange={ this.props.onChange }
                                             keyword={ columnFilters.keyword } />
                            </div>
                            <div className="column-search-tag">
                                { this.tags() }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-dismiss="modal" onClick={ this.props.onSearch }>搜    索</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ColumnSearchModal.propTypes = {
    columnFilters: PropTypes.object.isRequired,
    onSelectTag: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};