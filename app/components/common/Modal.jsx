'use strict';
import React, { Component, PropTypes } from 'react';

export default class Modal extends Component {

    render() {
        return (
            <div className="modal" style={{ display:this.props.show ? 'block': 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.Header = class extends React.Component {

    render() {
        return (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                        onClick={ this.props.onClose }>
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.children}
            </div>
        );
    }
};

Modal.Body = class extends React.Component {
    render() {
        return (
            <div className="modal-body">
                {this.props.children}
            </div>
        );
    }
};

Modal.Footer = class extends React.Component {
    render() {
        return (
            <div className="modal-footer">
                {this.props.children}
            </div>
        );
    }
};

Modal.propTypes =  {
    show: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};

Modal.Header.propTypes = {
    onClose: PropTypes.func.isRequired
};