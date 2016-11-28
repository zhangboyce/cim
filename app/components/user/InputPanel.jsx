'use strict';
import React, {Component, PropTypes} from 'react';

export default class InputPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "", message: "" };
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
                        this.setState({ message: prop });
                        ok = false;
                        break;
                    }
                }
            }

            if (ok) {
                this.setState({ message: "" });
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
                       type="text"
                       placeholder={ this.props.placeholder }/>
                {
                    this.state.message && <span>{ this.state.message }</span>
                }
            </div>
        )
    }
};

InputPanel.propTypes =  {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    validation: PropTypes.object,
    placeholder: PropTypes.string
};
