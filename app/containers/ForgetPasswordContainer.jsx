'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as UseActions from '../actions/user';

import InputPanel from '../components/user/InputPanel.jsx';

class ForgetPasswordContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', message: '', validateResult: false };
    }

    handleChange(value) {
        this.setState({ value: value });
    }

    handleValidate(validateResult, message) {
        this.setState({ validateResult: validateResult, message: message });
    }

    handleValidateEmailRegistered(val) {
        return message => {
            $.get('/api/user/validate/email/registered', { email: val }, result => {
                if (result) {
                    this.setState({ validateResult: true, message: '' });
                } else {
                    this.setState({ validateResult: false, message: message });
                }
            });
        }
    }

    handleSubmit() {
        this.props.actions.sendForgetPasswordEmail(this.state.value);
    }

    setForgetPasswordEmailResult() {
        this.props.actions.setForgetPasswordEmailResult(false);
    }

    render() {
        let validation = {
            "邮箱账号不能为空!": val => val && val.trim(),
            "邮箱账号格式不正确!": val => { return /^([\w]+(?:\.[\w]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(val) },
            "该邮箱地址没有注册!": val => { return this.handleValidateEmailRegistered(val) }
        };

        const { sendForgetPasswordEmailResult } = this.props;
        return (
            <div className="forget-password-content">
                {
                    sendForgetPasswordEmailResult ?
                        <div className="prompt-panel">
                            <p>
                                找回密码邮件已成功发送，请进入邮箱({ this.state.value })验证找回密码。
                            </p>
                            <a href="javascript:void(0);" onClick={ this.handleSubmit.bind(this) }>重新发送</a>
                            <a href="javascript:void(0);" onClick={ this.setForgetPasswordEmailResult.bind(this) }>邮箱地址写错了</a>
                        </div>:
                        <div>
                            <InputPanel value={ this.state } type="text" validation={ validation } onValidate={ this.handleValidate.bind(this) } onChange={ this.handleChange.bind(this) } placeholder="已注册的邮箱账号"/>
                            <div className="submit-btn">
                                {
                                    this.state.validateResult ?
                                        <button type="button" className="btn" onClick={ this.handleSubmit.bind(this) }>发送密码找回邮件</button>:
                                        <button type="button" className="btn" disabled="disabled">发送密码找回邮件</button>
                                }
                            </div>
                        </div>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        sendForgetPasswordEmailResult: state.user.sendForgetPasswordEmailResult
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
)(withRouter(ForgetPasswordContainer));

