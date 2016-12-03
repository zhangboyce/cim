'use strict';
import React, {Component, PropTypes} from 'react';

export default class InputPanel extends Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.state = { message: '' };
    }

    handleChange(e) {
        let value = e.target.value;
        this.validate(value);
        this.props.onChange(value);
    }

    handleBlur(e) {
        let value = e.target.value;
        this.validate(value);
    }

    validate(value) {
        let validation = this.props.validation;
        if (validation) {
            let ok = true;
            for (let prop in validation) {
                if (validation.hasOwnProperty( prop )) {
                    let vf = validation[prop];
                    if (vf instanceof Function) {
                        let result = vf(value);
                        if (result instanceof Function) {
                            result(prop);
                        } else if(!result) {
                            ok = false;
                            this.props.onValidate(false, prop);
                            break;
                        }
                    }
                }
            }
            if (ok) {
                this.props.onValidate(true, "");
            }
        }

    }

    render() {
        const { value, type, placeholder } = this.props;
        return (
            <div className="input-panel">
                <input className="form-control"
                       value={ value.value || '' }
                       onChange={ this.handleChange.bind(this) }
                       onBlur={ this.handleBlur.bind(this) }
                       type={ type || "text" }
                       placeholder={ placeholder }/>
                { !value.validateResult && value.message && <span>{ value.message }</span>}
            </div>
        )
    }
};

InputPanel.propTypes =  {
    onChange: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
    type: PropTypes.string,
    validation: PropTypes.object,
    value: PropTypes.object.isRequired,
    placeholder: PropTypes.string
};
