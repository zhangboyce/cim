'use strict';
import React, {Component, PropTypes} from 'react';
import BallLoading from './BallLoading.jsx';

import $ from 'jquery';

export default class ScrollPagination extends Component {

    constructor(props) {
        super(props);
        this.state = {page: 0}
    }

    nextPage = () => {
        this.props.next(this.state.page + 1);
        this.setState({ page: this.state.page + 1 });
    };

    componentDidMount() {
        let pagination = $(this.refs.pagination);
        let $w = $(window);
        this.$w = $w;
        $w.scroll(() => {
            let hasNext = this.props.hasNext();
            let needNext = (pagination.offset().top + pagination.height()) < ($w.scrollTop() + $w.height());
            if (needNext && hasNext) {
                this.nextPage();
            }
        });
        this.nextPage();
    }

    render() {
        return (
            <div ref='pagination'>
                { this.props.children }
                {
                    this.props.hasNext() &&
                    <a className="btn btn-default btn-lg btn-block" onClick={this.nextPage}>
                        <span>Load more</span>
                    </a>
                }
            </div>
        );

    }
}

ScrollPagination.propTypes = {
    next: PropTypes.func.isRequired,
    hasNext: PropTypes.func.isRequired
};