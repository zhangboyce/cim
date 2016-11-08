'use strict';

import React, {Component, PropTypes} from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-content">
                    <div className="contact-us">
                        <p>联系我们</p>
                        <div><i className="fa fa-envelope-o" /><span>jason.tian@cctvxck.com</span></div>
                        <div><i className="fa fa-phone" /><span>010-59422059</span></div>
                        <div><i className="fa fa-qq" /><span><a href="#">在线客服</a></span></div>
                    </div>
                    <div className="about-us">
                        <p><a href="#">关于我们</a></p>
                        <p><a href="#">意见反馈</a></p>
                    </div>
                    <div className="join-us">
                        <img src="/public/imgs/qr-code.jpg"/>
                        <br/>
                        <p>扫一扫  加入我们</p>
                    </div>
                </div>
                <span className="copyright">版权所有: cmtv.com/</span>
            </div>
        );
    }
};