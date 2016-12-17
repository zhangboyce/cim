'use strict';
import React from 'react';

export default class SearchLoading extends React.Component {

    render() {
        return (
            <div className="loading">
                <img src="/public/imgs/common/magnify.svg"/>
            </div>
        );
    }
}