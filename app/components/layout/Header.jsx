'use strict';

import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import _ from 'lodash';
import { browserHistory } from 'react-router';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { menus: [
            { name: "广告招商", path: "/column/ai", active: false },
            { name: "创意策划", path: "/column/cp", active: false },
            { name: "版权购买", path: "/column/cb", active: false } ]};
    }

    handleClickMenu = name => () => {
        let menus = [...this.state.menus];
        _.forEach(menus, menu => { menu.active = false});
        let index = menus.findIndex(menu => menu.name == name);
        menus[index].active = true;
        this.setState({ menus: menus });
    };

    handleLogout = () => {
        let redirectAfterLogin = window.location.pathname;
        this.props.onLogout(`/user/login?next=${redirectAfterLogin}`);
    };

    render() {
        const { auth } = this.props;
        let menus = this.state.menus.map(menu => {
            return (
                <li key={ menu.name } className={ classnames({ "nav-item": true, active: menu.active })} onClick={ this.handleClickMenu(menu.name) } >
                    <Link className="nav-link" to={ menu.path }>{ menu.name }</Link>
                </li>
            );
        });

        return (
            <nav className="navbar navbar-fixed-top navbar-dark header main-background">
                <Link className="navbar-brand" href="/">
                    <img src="/public/imgs/logo.jpg"/>
                </Link>
                <ul className="nav navbar-nav">
                    { menus }
                </ul>
                <div className="pull-right user-info">
                    {
                        auth.isAuthenticated && auth.user ?
                            <div className="user-logout">
                                <div className="avatar">
                                    <img src={ auth.user.avatarName ?  `/public/imgs/users/${auth.user._id}/${auth.user.avatarName}` : '/public/imgs/users/default.png'} />
                                </div>
                                <div className="dropdown">
                                    <a className="dropdown-toggle main-background"  href="javascript:;" id="dropdownMenu1" data-toggle="dropdown">
                                        { auth.user.username || auth.user.email || auth.user.mobile }
                                        <span className="caret" />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu1">
                                        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">个人信息</a></li>
                                        <li role="presentation" className="divider" />
                                        <li role="presentation"><a role="menuitem" href="#" tabIndex="-1" onClick={ this.handleLogout }>安全退出</a></li>
                                    </ul>
                                </div>
                            </div> :

                            <div className="user-login-register">
                                <Link to="/user/register">注册</Link>
                                <div className="vertical-line"></div>
                                <Link to="/user/login">登录</Link>
                            </div>
                    }
                </div>
            </nav>

        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

