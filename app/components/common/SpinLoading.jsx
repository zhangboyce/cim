'use strict';
import React from 'react';

export default class SpinLoading extends React.Component {

    render() {
        return (
            <div className="loading">
                <img src="/public/imgs/common/spin.svg"/>
            </div>
        );
    }
}