'use strict';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, browserHistory, Link } from 'react-router';
import * as UseActions from '../actions/user';

const InputPanel = class extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "", message: "" }
    }

    handleChange(e) {
        let value = e.target.value;
        if (value && value.trim()) {
            this.setState({ value: value });
        } else {
            this.setState({ message: this.props.message });
        }
    }

    render() {
        return (
            <div className="input-panel">
                <input className="form-control" value={ this.state.value } onChange={ this.handleChange.bind(this) } type="text" placeholder={ this.props.placeholder }/>
                {
                    this.state.message && <span>{ this.state.message }</span>
                }
            </div>
        )
    }
};

class RegisterContainer extends Component {

    render() {
        return (
            <div className="user-register-container">
                <img src="/public/imgs/background.png" />
                <div className="register-background" />
                <div className="register-content">
                    <InputPanel />
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispath => {
    return {
        actions: bindActionCreators(Object.assign({}, UseActions), dispath)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RegisterContainer));

