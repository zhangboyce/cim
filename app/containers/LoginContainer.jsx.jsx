'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as UseActions from '../actions/user';

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', password: '' };
    }

    handleChangeName(e) {
        let value = e.target.value;
        this.setState({ name: value&&value.trim() ? value: "" });
    }

    handleChangePassword(e) {
        let value = e.target.value;
        this.setState({ password: value&&value.trim() ? value: "" });
    }

    handleSubmit() {
        console.log('-------' + _.every(_.values(this.state.validation), it => it));
        console.log('state: ' + JSON.stringify(this.state))

    }

    render() {
        return (
            <div className="login-content">
                <div className="login-input">
                    <span><i className="fa fa-user fa-2x"/></span>
                    <input className="form-control" type="text" value={ this.state.name } onChange={ this.handleChangeName.bind(this) } />
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


const mapDispatchToProps = dispath => {
    return {
        actions: bindActionCreators(Object.assign({}, UseActions), dispath)
    }
};

export default connect(
    mapDispatchToProps
)(withRouter(LoginContainer));

