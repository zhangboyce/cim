'use strict';

import React, {Component, PropTypes} from 'react';
import Cropper from 'react-cropper';
import FileUploader from '../common/FileUploader.jsx';

export default class AvatarUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cropperOpen: false,
            img: null,
            croppedImg: null
        }
    }


    handleFileChange(dataURI) {
        this.setState({
            img: dataURI,
            cropperOpen: true
        });
    }

    _crop(){
        // image in dataUrl
        console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }

    render() {
        return (
            <div className="upload-panel">
                <div className="upload-camera">
                    <FileUploader onFileChange={ this.handleFileChange.bind(this) } />
                    { this.state.croppedImg ? <img src={ this.state.croppedImg }/> : <i className="fa fa-camera fa-2x"/> }
                </div>
                <div className="upload-explain">
                    <p>上传头像(企业logo)</p>
                    <p>文件小于512k</p>
                </div>
                <FileUploader onFileChange={ this.handleFileChange.bind(this) } text="点击上传"/>
                { this.state.cropperOpen &&
                <Cropper
                    ref='cropper'
                    src={ this.state.img }
                    style={{height: 400, width: '100%'}}
                    aspectRatio={16 / 9}
                    guides={false}
                    crop={this._crop.bind(this)} />
                }
            </div>
        );
    }
};