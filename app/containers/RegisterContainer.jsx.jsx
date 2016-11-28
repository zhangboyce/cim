'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as UseActions from '../actions/user';

import InputPanel from '../components/user/InputPanel.jsx';
import AvatarUploader from '../components/user/AvatarUploader.jsx';

class RegisterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(name, value) {
        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    handleSubmit() {
        console.log('state: ' + JSON.stringify(this.state))
    }

    handleSaveAvatar(avatarUrl) {
        this.setState({ avatarUrl: avatarUrl });
    }

    render() {
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
                "邮箱账号格式不正确!": val => { return /^([\w]+(?:\.[\w]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(val) }
            },
            password: {
                "密码不能为空!": val => val && val.trim(),
                "密码格式不正确!": val => { return /^(?=.*\d)(?=.*[a-zA-Z]).{7,}$/.test(val) }
            },
            rePassword: {
                "重复密码不能为空!": val => val && val.trim(),
                "重复密码不正确!": val => { return val === this.state.password }
            },
            mobile: {
                "手机号码不能为空!": val => val && val.trim(),
                "手机号码格式不正确!": val => { return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val) }
            }
        };

        return (
            <div className="user-register-container">
                <img src="/public/imgs/background.png" />
                <div className="register-content">
                    <InputPanel name="columnName" validation={ validations.columnName} onChange={ this.handleChange.bind(this) } placeholder="频道名称"/>
                    <InputPanel name="name" validation={ validations.name } onChange={ this.handleChange.bind(this) } placeholder="姓名"/>
                    <InputPanel name="email" validation={ validations.email } onChange={ this.handleChange.bind(this) } placeholder="邮箱账号(企业邮箱)"/>
                    <InputPanel name="password" validation={ validations.password } onChange={ this.handleChange.bind(this) } placeholder="输入密码(字母+数字6位以上)"/>
                    <InputPanel name="rePassword" validation={ validations.rePassword }  onChange={ this.handleChange.bind(this) } placeholder="再次输入密码"/>
                    <InputPanel name="mobile" validation={ validations.mobile } onChange={ this.handleChange.bind(this) } placeholder="手机号码"/>

                    <AvatarUploader onSaveAvatar={ this.handleSaveAvatar.bind(this) }/>

                    <button type="button" className="btn" onClick={ this.handleSubmit.bind(this) }>注&nbsp;&nbsp;册</button>
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
)(withRouter(RegisterContainer));

