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
        this.state = { email: '', message: '', validation: false };
    }

    componentDidMount() {
        this.props.actions.sendForgetPasswordEmail();
    }

    handleChange(e) {
        let value = e.target.value;

    }

    handleValidate(inputName, validateResult) {
        this.setState(validateResult);
    }

    handleValidateEmailUnique(val) {
        return message => {

        }
    }

    render() {
        let validation = {
            "邮箱账号不能为空!": val => val && val.trim(),
            "邮箱账号格式不正确!": val => { return /^([\w]+(?:\.[\w]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(val) },
            "该邮箱地址已被注册!": val => { return this.handleValidateEmailUnique(val) }
        };

        return (
            <div className="forget-password-content">
                <div className="login-input">
                    <span><i className="fa fa-envelope fa-2x"/></span>
                    <InputPanel name="email" value={ {} } type="text" validation={ validation } onValidate={ this.handleValidate.bind(this) } onChange={ this.handleChange.bind(this) } placeholder="邮箱账号(企业邮箱)"/>
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
)(withRouter(ForgetPasswordContainer));

