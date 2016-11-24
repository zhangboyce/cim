'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class Banner extends Component {

    componentDidMount() {
        $('.banner').unslider({
            autoplay: true,
            delay: 5000,
            arrows: {
                prev: '<a class="unslider-arrow prev"><i class="fa fa-chevron-left fa-2x" /></a>',
                next: '<a class="unslider-arrow next"><i class="fa fa-chevron-right fa-2x" /></a>'
            }
        });
    }

    render() {
        let banners = [ '商务合作.png', '广告招商.png', '我的关注.png', '版权购买.png' ];
        return (
            <div className="banner">
                <ul>
                    {
                        _.map(banners, banner =>{
                            return <li key={banner}><img src={`/public/imgs/banners/${banner}`}/></li>
                        })
                    }
                </ul>
            </div>
        );
    }
};