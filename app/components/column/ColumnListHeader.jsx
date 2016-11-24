'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class ColumnListHeader extends Component {

    handleChange() {

    }

    render() {
        const { filters } = this.props;

        return (
            <div className="column-list-header">
                {
                    _.map(filters, filter => {
                        return (
                            <div key={ filter.name } className="col-select">
                                <span>{ filter.name }:</span>
                                <span>
                                    <select className="form-control" onChange={ this.handleChange.bind(this) }>
                                        {
                                            _.map(filter.values, v => {
                                                return <option key={ v } value={ v }>{ v }</option> ;
                                            })
                                        }
                                    </select>
                                </span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
};

ColumnListHeader.propTypes = {
    filters: PropTypes.array.isRequired
};