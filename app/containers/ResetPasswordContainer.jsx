'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as UseActions from '../actions/user';

import _ from 'lodash';
import md5 from 'MD5';

import InputPanel from '../components/user/InputPanel.jsx';

class ResetPasswordContainer extends Component {

    constructor(props) {
        super(props);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = { legalValidCode: true };
    }

    componentDidMount() {
        let validCode = this.props.params.validCode;
        if (!validCode || validCode.length != 32) {
            this.setState({ legalValidCode: false });
        }

        $.post('/api/user/validCode', { validCode: validCode }, result => {
            this.setState({ legalValidCode: result });
        });
    }

    handleSubmit() {
        let password = md5(this.props.resetPassword.password);
        let validCode = this.props.params.validCode;
        this.props.actions.resetPassword(validCode, password);
    }

    handleValidate(name) {
        return (validateResult, message) => {
            this.props.actions.validateResetPasswordInfo(name, validateResult, message);
        }
    }

    handleChange(name) {
        return val => {
            this.props.actions.addResetPasswordInfo(name, val);
        }
    }

    render() {

        const { resetPassword } = this.props;
        let password = resetPassword.password;
        let rePassword = resetPassword.rePassword;

        let passwordValidation = {
            "密码不能为空!": val => val && val.trim(),
            "密码格式不正确!": val => { return /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(val) }
        };

        let rePasswordValidation = {
            "密码不能为空!": val => val && val.trim(),
            "重复密码不正确!": val => { return val === password.value }
        };

        return (
            <div className="reset-password-content">
                { this.state.legalValidCode ?
                    <div>
                        <InputPanel value={ password } type="password" validation={ passwordValidation } onValidate={ this.handleValidate('password') } onChange={ this.handleChange('password') } placeholder="输入新密码"/>
                        <InputPanel value={ rePassword } type="password" validation={ rePasswordValidation } onValidate={ this.handleValidate('rePassword') } onChange={ this.handleChange('rePassword') } placeholder="重新输入新密码"/>
                        <div className="submit-btn">
                            {
                                password.validateResult && rePassword.validateResult ?
                                    <button type="button" className="btn" onClick={ this.handleSubmit.bind(this) }>确定修改</button> :
                                    <button type="button" className="btn" disabled="disabled" >确定修改</button>
                            }
                        </div>
                    </div> :
                    <div>
                        <div className="prompt-panel">
                            <p>
                                验证邮件链接无效。
                            </p>
                            <Link to="/user/forgetPassword">重新发送验证邮件</Link>
                            <Link to="/">返回首页</Link>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        resetPassword: state.user && state.user.resetPassword
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
)(withRouter(ResetPasswordContainer));

