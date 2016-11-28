'use strict';

import React, {Component, PropTypes} from 'react';

export default class FileUploader extends Component {

    render() {
        return (
            <div>
                <AvatarEditor
                    image="/public/imgs/logo.png"
                    ref="editor"
                    width={250}
                    height={250}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={1.2} />
            </div>
        );
    }
};