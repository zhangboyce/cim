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

    handleChange(name, value) {
        this.props.actions.addUserInfo(name, value);
    }

    handleValidate(name, validateResult) {
        this.props.actions.validateUserInfo(name, validateResult);
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

    handleValidateEmailUnique(val, message) {
        $.get('/api/user/validate/email/unique', { email: val } , (result) => {
            if (result) {
                this.props.actions.validateUserInfo('email', { validation: true, message: '' });
            } else {
                this.props.actions.validateUserInfo('email', { validation: false, message: message });
            }
        });
    }

    handleValidateMobileUnique(val) {
        $.get('/api/user/validate/mobile/unique', { mobile: val } , (result) => {
            if (result) {
                this.props.actions.validateUserInfo('mobile', { validation: true, message: '' });
            } else {
                this.props.actions.validateUserInfo('mobile', { validation: false, message: message });
            }
        });
    }

    render() {
        const { register } = this.props;
        const validations = {
            columnName: {
                "频道名称不能为空!": val => val && val.trim(),
                "频道名称包含非法字符!": val => { return /^[\w\u4e00-\u9fa5]+$/.test(val) }
            },
            name: {
                "姓名不能为空!": val => val && val.trim(),
                "姓名包含非法字符!": val => { return /^[\w\u4e00-\u9fa5]+$/.test(val) }
            },
            email: {
                "邮箱账号不能为空!": val => val && val.trim(),
                "邮箱账号格式不正确!": val => { return /^([\w]+(?:\.[\w]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(val) },
                "该邮箱地址已被注册!": { func: (val, message) => { this.handleValidateEmailUnique(val, message) }}
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
                "该手机号码已被注册!": { func: (val, message) => { this.handleValidateMobileUnique(val, message) }}
            }
        };

        return (
            <div className="register-content">
                <InputPanel name="columnName" type="text" value={ register.columnName } validation={ validations.columnName} onValidate={ this.handleValidate.bind(this) } onChange={ this.handleChange.bind(this) } placeholder="频道名称"/>
                <InputPanel name="name" value={ register.name } type="text" validation={ validations.name } onValidate={ this.handleValidate.bind(this) } onChange={ this.handleChange.bind(this) } placeholder="姓名"/>
                <InputPanel name="email" value={ register.email } type="text" validation={ validations.email } onValidate={ this.handleValidate.bind(this) } onChange={ this.handleChange.bind(this) } placeholder="邮箱账号(企业邮箱)"/>
                <InputPanel name="password" value={ register.password } type="password" validation={ validations.password } onValidate={ this.handleValidate.bind(this) } onChange={ this.handleChange.bind(this) } placeholder="输入密码(字母+数字6位或者以上)"/>
                <InputPanel name="rePassword" value={ register.rePassword } type="password" validation={ validations.rePassword }  onValidate={ this.handleValidate.bind(this) } onChange={ this.handleChange.bind(this) } placeholder="再次输入密码"/>
                <InputPanel name="mobile" value={ register.mobile } type="text" validation={ validations.mobile } onValidate={ this.handleValidate.bind(this) } onChange={ this.handleChange.bind(this) } placeholder="手机号码"/>

                <AvatarUploader avatarData={ register.avatarData && register.avatarData.value } onSaveAvatar={ this.handleSaveAvatar.bind(this) }/>

                {
                    _.every(register, 'value', true) ?
                        <button type="button" className="btn" onClick={ this.handleSubmit.bind(this) }>注&nbsp;&nbsp;册</button> :
                        <button type="button" className="btn" disabled="disabled" onClick={ this.handleSubmit.bind(this) }>注&nbsp;&nbsp;册</button>
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

