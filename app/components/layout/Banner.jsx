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
        let banners = [
            'banner1.jpg',
            'banner2.jpg',
            'banner3.jpg',
            'banner4.jpg',
            'banner5.jpg',
            'banner6.jpg' ];

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