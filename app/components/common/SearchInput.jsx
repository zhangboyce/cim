'use strict';

import React, {Component, PropTypes} from 'react';

export default class SearchInput extends Component {

    handleChange = e => {
        let keyword = e.target.value;
        this.props.onChange(keyword);
    };

    handleKeyUp = e => {
        if (e.keyCode == 13 && this.props.onSearch) {
            this.props.onSearch();
        }
    };

    render() {
        return (
            <div className="search-input">
                {
                    this.props.keyword && this.props.onSearch &&
                        <i className="fa fa-search" onClick={ this.props.onSearch }/>
                }
                <input type="text" className="form-control" value={this.props.keyword} onChange={ this.handleChange } onKeyUp={ this.handleKeyUp } placeholder="Search"/>
            </div>
        );
    }
};

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func,
    keyword: PropTypes.string
};