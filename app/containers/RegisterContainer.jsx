'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as UseActions from '../actions/user';
import _ from 'lodash';
import $ from 'jquery';
import md5 from 'MD5';
import fs from 'fs';

import InputPanel from '../components/user/InputPanel.jsx';
import AvatarUploader from '../components/user/AvatarUploader.jsx';

class RegisterContainer extends Component {

    constructor(props) {
        super(props);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name) {
        return (value) => {
            this.props.actions.addUserInfo(name, value);
        };
    }

    handleValidate(name) {
        return (validateResult, message) => {
            this.props.actions.validateUserInfo(name, validateResult, message);
        };
    }

    handleSubmit() {
        const { register } = this.props;
        let user = {};
        user.columnName = register.columnName.value;
        user.name = register.name.value;
        user.email = register.email.value;
        user.password = md5(register.password.value);
        user.mobile = register.mobile.value;

        let avatarData = register.avatarData && register.avatarData.value;
        this.props.actions.register(user, avatarData);
    }

    handleSaveAvatar(avatarData) {
        this.props.actions.addUserInfo('avatarData', avatarData);
    }

    handleValidateEmailUnique(val) {
        return message => {
            this.props.actions.validateEmailUnique(val, message);
        }
    }

    handleValidateMobileUnique(val) {
        return message => {
            this.props.actions.validateMobileUnique(val, message);
        }
    }

    handleValidateNameUnique(val) {
        return message => {
            this.props.actions.validateNameUnique(val, message);
        }
    }

    render() {
        const { register } = this.props;
        const validations = {
            columnName: {
                "频道名称不能为空!": val => val && val.trim(),
                "频道名称包含非法字符!": val => { return /^[\w\u4e00-\u9fa5]+$/.test(val) }
            },
            name: {
                "用户名不能为空!": val => val && val.trim(),
                "用户名包含非法字符!": val => { return /^[\w\u4e00-\u9fa5]+$/.test(val) },
                "用户名已被注册!": val => { return this.handleValidateNameUnique(val) }
            },
            email: {
                "邮箱账号不能为空!": val => val && val.trim(),
                "邮箱账号格式不正确!": val => { return /^([\w]+(?:\.[\w]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(val) },
                "该邮箱地址已被注册!": val => { return this.handleValidateEmailUnique(val) }
            },
            password: {
                "密码不能为空!": val => val && val.trim(),
                "密码格式不正确!": val => { return /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(val) }
            },
            rePassword: {
                "重复密码不能为空!": val => val && val.trim(),
                "重复密码不正确!": val => { return val === register.password.value }
            },
            mobile: {
                "手机号码不能为空!": val => val && val.trim(),
                "手机号码格式不正确!": val => { return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val) },
                "该手机号码已被注册!": val => { return this.handleValidateMobileUnique(val) }
            }
        };

        return (
            <div className="register-content">
                <InputPanel value={ register.columnName } validation={ validations.columnName } onValidate={ this.handleValidate("columnName") } onChange={ this.handleChange("columnName") } placeholder="频道名称"/>
                <InputPanel value={ register.name } validation={ validations.name } onValidate={ this.handleValidate("name") } onChange={ this.handleChange("name") } placeholder="姓名"/>
                <InputPanel value={ register.email } validation={ validations.email } onValidate={ this.handleValidate("email") } onChange={ this.handleChange("email") } placeholder="邮箱账号(企业邮箱)"/>
                <InputPanel value={ register.password } type="password"  validation={ validations.password } onValidate={ this.handleValidate("password") } onChange={ this.handleChange("password") } placeholder="输入密码(字母+数字6位或者以上)"/>
                <InputPanel value={ register.rePassword } type="password"  validation={ validations.rePassword }  onValidate={ this.handleValidate("rePassword") } onChange={ this.handleChange("rePassword") } placeholder="再次输入密码"/>
                <InputPanel value={ register.mobile }  validation={ validations.mobile } onValidate={ this.handleValidate("mobile") } onChange={ this.handleChange("mobile") } placeholder="手机号码"/>

                <AvatarUploader avatarData={ register.avatarData && register.avatarData.value } onSaveAvatar={ this.handleSaveAvatar.bind(this) }/>

                {
                    _.every(register, 'validateResult', true) ?
                        <button type="button" className="btn" onClick={ this.handleSubmit.bind(this) }>注&nbsp;&nbsp;册</button> :
                        <button type="button" className="btn" disabled="disabled">注&nbsp;&nbsp;册</button>
                }
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        register: state.user && state.user.register
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
)(withRouter(RegisterContainer));

