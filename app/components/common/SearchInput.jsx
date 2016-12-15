'use strict';

import React, {Component, PropTypes} from 'react';

export default class SearchInput extends Component {

    handleChange = e => {
        let keyword = e.target.value;
        this.props.onChange(keyword);
    };

    render() {
        return (
            <div className="search-input">
                {
                    this.props.keyword &&
                        <i className="fa fa-search" onClick={ this.props.onSearch }/>
                }
                <input className="form-control" value={this.props.keyword} type="text" onChange={ this.handleChange } placeholder="Search"/>
            </div>
        );
    }
};

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    keyword: PropTypes.string
};