'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class ColumnListHeader extends Component {

    render() {
        const { filters } = this.props;

        return (
            <div className="column-list-header col-sm-12">
                <div className="row">
                    {
                        _.map(filters, filter => {
                            return (
                                <div className="col-sm-1 col-select">
                                    <span>{ filter.name }</span>
                                    <select className="form-control" onChange="">
                                        {
                                            _.map(filter.values, v => {
                                                return <option key={ v } value={ v }>{ v }</option> ;
                                            })
                                        }
                                    </select>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
};

ColumnListHeader.propTypes = {
    filters: PropTypes.array.isRequired
};