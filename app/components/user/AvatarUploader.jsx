'use strict';

import React, {Component, PropTypes} from 'react';
import FileUploader from '../common/FileUploader.jsx';
import AvatarCropperModal from './AvatarCropperModal.jsx';

export default class AvatarUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            img: null,
            cropperOpen: false,
            uploadResultMessage: '',
            maxFileSize: 1024 // kb
        }

    };

    handleUploadResult = message => {
        this.setState({ uploadResultMessage: message });
    };

    handleFileChange = dataURI => {
        this.setState({ img: dataURI, cropperOpen: true, uploadResultMessage: '' });
    };

    handleSave = dataUrl => {
        this.setState({ img: null, cropperOpen: false });
        this.props.onSaveAvatar(dataUrl);
    };

    handleClose = () => {
        this.setState({ cropperOpen: false });
    };

    render() {
        return (
            <div className="upload-panel">
                <div className="upload-camera">
                    <FileUploader maxFileSize={ this.state.maxFileSize } onUploadMessage={ this.handleUploadResult } onFileChange={ this.handleFileChange } />
                    { this.props.avatarData ? <img src={ this.props.avatarData }/> : <i className="fa fa-camera fa-2x"/> }
                </div>
                <div className="upload-explain">
                    <p>上传头像(企业logo)</p>
                    <p>文件小于1Mb</p>
                    { this.state.uploadResultMessage &&
                        <p className="upload-message">{ this.state.uploadResultMessage }</p>
                    }
                </div>
                <FileUploader maxFileSize={ this.state.maxFileSize } onUploadMessage={ this.handleUploadResult } onFileChange={ this.handleFileChange } text="点击上传"/>

                <AvatarCropperModal img={ this.state.img }
                                    onClose={ this.handleClose }
                                    show={ this.state.cropperOpen }
                                    onSave={ this.handleSave } />
            </div>
        );
    }
};

AvatarUploader.propTypes =  {
    onSaveAvatar: PropTypes.func.isRequired,
    avatarData: PropTypes.string
};