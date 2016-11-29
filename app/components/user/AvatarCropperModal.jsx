'use strict';

import React, {Component, PropTypes} from 'react';
import Cropper from 'react-cropper';
import Modal from '../common/Modal.jsx';

export default class AvatarCropperModal extends Component {

    handleSave() {
        let dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
        if (typeof dataUrl === 'undefined') {
            return;
        }
        this.props.onSave( dataUrl );
    }

    render() {
        return (
            <Modal show={ this.props.show } id="avatar-cropper-modal">
                <Modal.Header onClose={ this.props.onClose }>
                    <h3>Crop it.</h3>
                </Modal.Header>
                <Modal.Body>
                    <Cropper
                        ref='cropper'
                        src={ this.props.img }
                        style={ { height: 200, width: 200, marginLeft: 30 } }
                        aspectRatio={ 16 / 16 }
                        preview=".img-preview"
                        guides={ true } />
                    <div className="img-preview" style={{ width: 200, height: 200 }}>
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
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    img: PropTypes.string
};