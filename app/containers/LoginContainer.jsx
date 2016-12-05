'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as UseActions from '../actions/user';

import md5 from 'MD5';

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', password: '' };
    }

    handleChangeValue(e) {
        let value = e.target.value;
        this.setState({ value: value&&value.trim() ? value: "" });
    }

    handleChangePassword(e) {
        let value = e.target.value;
        this.setState({ password: value&&value.trim() ? value: "" });
    }

    handleSubmit() {
        let value = this.state.value;
        let password = this.state.password;

        if (value && password) {
            this.props.actions.login(value, md5(password));
        }
    }

    render() {
        return (
            <div className="login-content">
                <div className="login-input">
                    <span><i className="fa fa-user fa-2x"/></span>
                    <input className="form-control" type="text" value={ this.state.value } onChange={ this.handleChangeValue.bind(this) } placeholder="用户名/邮箱地址/电话号码"/>
                </div>
                <div className="login-input">
                    <span><i className="fa fa-lock fa-2x"/></span>
                    <input className="form-control" type="password" value={ this.state.password } onChange={ this.handleChangePassword.bind(this) } />
                </div>
                <div className="login-operator">
                    <div className="forget-password">
                        <Link to="/user/register">注册</Link>
                        <Link to="/user/forgetPassword">忘记密码</Link>
                    </div>
                    <div className="submit-btn">
                        <button type="button" className="btn" onClick={ this.handleSubmit.bind(this) }>登&nbsp;&nbsp;录</button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispath => {
    return {
        actions: bindActionCreators(Object.assign({}, UseActions), dispath)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginContainer));

