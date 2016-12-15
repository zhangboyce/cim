'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as ColumnActions from '../actions/column';
import Title from './../components/layout/Title.jsx';
import HotColumnList from '../components/column/HotColumnList.jsx';

import _ from 'lodash';

class HotColumnContainer extends Component {

    componentWillMount() {
        this.props.actions.listHotColumns(this.props.token);
    }

    render() {
        const { hotColumns } = this.props;
        return (
            <div className="hot-column">
                <Title zh_name="热门栏目" en_name="hot column"/>
                {
                    hotColumns.reloaded && <HotColumnList hotColumns={ hotColumns.list } />
                }
                <div className="hot-column-more">
                    <Link to="/column/ai"><span className="tag tag-pill">More</span></Link>
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        hotColumns: state.hotColumns,
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
)(withRouter(HotColumnContainer));

