'use strict';
import React, {Component, PropTypes} from 'react';
import Title from './../components/layout/Title.jsx';

import _ from 'lodash';

export default class CooperativeUnitContainer extends Component {

    render() {
        let coops = [
            'coop1.jpg',
            'coop2.jpg',
            'coop3.jpg',
            'coop4.jpg',
            'coop5.jpg' ];

        return (
            <div className="cooperative-unit">
                <Title zh_name="客户一览" en_name="cooperative unit"/>
                <div className="cooperative-unit-list">
                    {
                        _.map(coops, coop =>{
                            return (
                                <div key={ coop } className="coop shadow"><img src={`/public/imgs/coops/${coop}`}/></div>
                            );
                        })
                    }
                </div>
            </div>
        );

    }
}