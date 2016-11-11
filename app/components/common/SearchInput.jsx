'use strict';

import React, {Component, PropTypes} from 'react';

export default class SearchInput extends Component {

    handleChange(e) {
        let keyword = e.target.value;
        this.props.onChange(keyword);
    }

    render() {
        return (
            <div className="search-input">
                {
                    this.props.keyword ?
                        <i className="fa fa-times" onClick={ this.props.onClearKeyword } /> :
                        <i className="fa fa-search" />
                }
                <input className="form-control" value={this.props.keyword} type="text" onChange={this.handleChange.bind(this)} placeholder="Search"/>
            </div>
        );
    }
};

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onClearKeyword: PropTypes.func.isRequired,
    keyword: PropTypes.string
};