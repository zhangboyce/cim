'use strict';

import React, {Component, PropTypes} from 'react';
import ReactDom from "react-dom";

export default class FileUploader extends Component {

    constructor(props) {
        super(props);
    }

    handleFile(e) {
        let reader = new FileReader();
        let file = e.target && e.target.files && e.target.files[0];
        if (!file) {
            this.props.onUploadMessage('No file!');
            return;
        }
        if (this.props.maxFileSize && (file.size > this.props.maxFileSize * 1024)) {
            this.props.onUploadMessage('File size out of limit!');
            return;
        }

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
    onUploadMessage: PropTypes.func.isRequired,
    maxFileSize: PropTypes.number,
    text: PropTypes.string
};