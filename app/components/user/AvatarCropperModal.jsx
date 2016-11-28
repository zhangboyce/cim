'use strict';

import React, {Component, PropTypes} from 'react';
import Cropper from 'react-cropper';
import Modal from '../common/Modal.jsx';

export default class AvatarCropperModal extends Component {
    constructor(props) {
        super(props);
        this.state = { previewImg: null }
    }

    componentDidMount() {
        this.previewImg();
    }

    handleSave() {
        let dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
        if (typeof dataUrl === 'undefined') {
            return;
        }
        this.props.onSave( dataUrl );
    }

    handleCrop() {
        this.previewImg();
    }

    previewImg = () => {
        let dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
        $('.img-preview img').attr('src', dataUrl);
    };

    render() {
        return (
            <Modal show={ this.props.img != null } id="avatar-cropper-modal">
                <Modal.Header>
                    <h3>Crop it.</h3>
                </Modal.Header>
                <Modal.Body>
                    <Cropper
                        ref='cropper'
                        src={ this.props.img }
                        style={ { height: 200, width: 200, marginLeft: 30 } }
                        aspectRatio={ 16 / 16 }
                        crop={ this.handleCrop.bind(this) }
                        guides={ true } />
                    <div className="img-preview" style={{ width: 200, height: 200 }}>
                        <img/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" value="保存" className="btn btn-success" onClick={ this.handleSave.bind(this) }>保存</button>
                </Modal.Footer>
            </Modal>
        );
    }
};

AvatarCropperModal.propTypes =  {
    onSave: PropTypes.func.isRequired,
    img: PropTypes.string
};