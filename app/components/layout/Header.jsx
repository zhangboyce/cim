'use strict';

import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import _ from 'lodash';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { menus: [
            { name: "广告招商", path: "/column/ai", active: false },
            { name: "创意策划", path: "/column/cp", active: false },
            { name: "版权购买", path: "/column/cb", active: false } ]};

        this.handleClickMenu = this.handleClickMenu.bind(this);
    }

    handleClickMenu(name) {
        return () => {
            let menus = [...this.state.menus];
            _.forEach(menus, menu => { menu.active = false});
            let index = menus.findIndex(menu => menu.name == name);
            menus[index].active = true;
            this.setState({ menus: menus });
        };
    }

    render() {
        const { global } = this.props;
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
                    <img src="/public/imgs/logo.png"/>
                </Link>
                <ul className="nav navbar-nav">
                    { menus }
                </ul>
                <div className="pull-right user-info">
                    <Link to="/register">注册</Link>
                    <div className="avatar">
                        <img src="/public/imgs/users/avatar1.jpg" />
                    </div>
                    <div className="dropdown">
                        <a className="dropdown-toggle main-background"  href="javascript:;" id="dropdownMenu1" data-toggle="dropdown">
                            zhangboyce@gmail.com
                            <span className="caret" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu1">
                            <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">个人信息</a></li>
                            <li role="presentation" className="divider" />
                            <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">安全退出</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
}

Header.propTypes = {
    global: PropTypes.object.isRequired
};

