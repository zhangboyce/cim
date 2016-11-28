'use strict';

import React, {Component, PropTypes} from 'react';
import ReactDom from "react-dom";

export default class FileUploader extends Component {

    constructor(props) {
        super(props);
    }

    handleFile(e) {
        let reader = new FileReader();
        let file = e.target.files[0];

        if (!file) return;

        reader.onload = img => {
            ReactDom.findDOMNode(this.refs.in).value = '';
            this.props.onFileChange(img.target.result);
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <span className="btn">
                { this.props.text }<input ref="in" type="file" accept="image/*" onChange={ this.handleFile.bind(this) } />
            </span>
        );
    }
};

FileUploader.propTypes =  {
    onFileChange: PropTypes.func.isRequired,
    text: PropTypes.string
};