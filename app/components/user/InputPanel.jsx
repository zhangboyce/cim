'use strict';
import React, {Component, PropTypes} from 'react';

export default class InputPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { value: ""};
        this.validate = this.validate.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        this.validate(value);

        this.setState({ value: value&&value.trim() ? value: "" });
        this.props.onChange(this.props.name, value);
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
                    if (vf instanceof Function && !vf(value)) {
                        ok = false;
                        this.props.onValidate(this.props.name, { validation: false, message: prop });
                        break;
                    } else if (vf instanceof Object && vf.func instanceof  Function) {
                        vf.func(value, prop);
                    }
                }
            }

            if (ok) {
                this.props.onValidate(this.props.name, { validation: true, message: '' });
            }
        }

    }

    render() {
        return (
            <div className="input-panel">
                <input className="form-control"
                       value={ this.state.value }
                       onChange={ this.handleChange.bind(this) }
                       onBlur={ this.handleBlur.bind(this) }
                       type={ this.props.type }
                       placeholder={ this.props.placeholder }/>
                {
                    this.props.message && <span>{ this.props.message }</span>
                }
            </div>
        )
    }
};

InputPanel.propTypes =  {
    onChange: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    validation: PropTypes.object,
    message: PropTypes.string,
    placeholder: PropTypes.string
};
