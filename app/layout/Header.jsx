'use strict';

import React, {Component, PropTypes} from 'react';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark header main-background">
                <a className="navbar-brand" href="#">
                    <img src="/public/imgs/logo.jpg"/>
                </a>
                <ul className="nav navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">创意策划</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">版权购买</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">广告招商</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">商务合作</a>
                    </li>
                </ul>
                <div className="pull-right user-info">
                    <div className="avatar">
                        <img src="/public/imgs/avatar1.jpg" />
                    </div>
                    <div className="dropdown">
                        <a className="dropdown-toggle main-background"  href="javascript:;" id="dropdownMenu1" data-toggle="dropdown">
                            zhangboyce@gmail.com
                            <span className="caret" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdownMenu1">
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">个人信息</a></li>
                            <li role="presentation" className="divider" />
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">安全退出</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
};