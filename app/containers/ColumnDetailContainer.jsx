'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as ColumnActions from '../actions/column';
import ColumnImg from './../components/column/ColumnImg.jsx';
import ColumnName from './../components/column/ColumnName.jsx';
import ColumnStatus from './../components/column/ColumnStatus.jsx';
import ColumnTag from './../components/column/ColumnTag.jsx';
import ColumnDetail from './../components/column/ColumnDetail.jsx';

class ColumnDetailContainer extends Component {

    componentWillMount() {
        this.viewColumn(this.props.params._id);
    }

    componentWillReceiveProps(newProps) {
        let params = this.props.params, newParams = newProps.params;
        if (params._id != newParams._id) {
            this.viewColumn(newProps.params._id);
        }
    }

    viewColumn = _id => {
        this.props.actions.viewColumn(_id, this.props.token);
    };

    render() {
        const { params, column } = this.props;

        return (
            <div className="column-detail-container">
                { column &&
                <div className="column-detail-content">
                    <div className="column-back">
                        <Link to={`/column/${ params.type }`}>
                            <i className="fa fa-chevron-left"/>&nbsp;栏目详情
                        </Link>
                    </div>
                    <ColumnImg column={ column }/>
                    <ColumnName name={ column.name } >
                        <ColumnTag column={ column } />
                        <ColumnStatus column={ column }/>
                    </ColumnName>
                    <ColumnDetail column={ column } showInDetail={ true } />
                    <p>想获取更多栏目详情，请通过以下合作方式和我们取得联系，谢谢。</p>
                    <div className="column-op">
                        <button type="button">我要赞助</button>
                        <button type="button">我要认播</button>
                        <button type="button">我要制作</button>
                    </div>
                    { column.prev &&
                    <div className="column-prev">
                        <Link to={`/column/${params.type}/${column.prev}`}><i className="fa fa-chevron-left fa-4x"/></Link>
                    </div>
                    }
                    {
                        column.next &&
                        <div className="column-next">
                            <Link to={`/column/${params.type}/${column.next}`}><i className="fa fa-chevron-right fa-4x"/></Link>
                        </div>
                    }
                </div>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    let columns = state.columns.list;
    let column = state.columns.current;

    let index = columns.findIndex(col => col._id == column._id);
    if (index > 0) {
        column.prev = columns[index - 1]._id;
    }
    if (index < columns.length - 1) {
        column.next = columns[index + 1]._id;
    }

    return {
        column: column,
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
)(withRouter(ColumnDetailContainer));

