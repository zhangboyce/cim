'use strict';

import React, {Component, PropTypes} from 'react';
import FileUploader from '../common/FileUploader.jsx';
import AvatarCropperModal from './AvatarCropperModal.jsx';

export default class AvatarUploader extends Component {

    constructor(props) {
        super(props);
        this.state = { img: null, cropperOpen: false }
    }

    handleFileChange(dataURI) {
        this.setState({ img: dataURI, cropperOpen: true });
    }

    handleSave(dataUrl) {
        this.setState({ img: null, cropperOpen: false });
        this.props.onSaveAvatar(dataUrl);
    }

    handleClose() {
        this.setState({ cropperOpen: false });
    }

    render() {
        return (
            <div className="upload-panel">
                <div className="upload-camera">
                    <FileUploader onFileChange={ this.handleFileChange.bind(this) } />
                    { this.props.avatarData ? <img src={ this.props.avatarData }/> : <i className="fa fa-camera fa-2x"/> }
                </div>
                <div className="upload-explain">
                    <p>上传头像(企业logo)</p>
                    <p>文件小于512kb</p>
                </div>
                <FileUploader onFileChange={ this.handleFileChange.bind(this) } text="点击上传"/>

                <AvatarCropperModal img={ this.state.img }
                                    onClose={ this.handleClose.bind(this) }
                                    show={ this.state.cropperOpen }
                                    onSave={ this.handleSave.bind(this) } />
            </div>
        );
    }
};

AvatarUploader.propTypes =  {
    onSaveAvatar: PropTypes.func.isRequired,
    avatarData: PropTypes.string
};