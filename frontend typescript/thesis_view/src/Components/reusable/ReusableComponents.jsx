import React from 'react';

import PropTypes from 'prop-types';
import * as reactbts from 'react-bootstrap';
export const FormInput = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    ...props
}) => {

    return (
        <React.Fragment>
            <reactbts.Form.Group controlId={name}>
                <reactbts.Form.Label>{label}</reactbts.Form.Label>
                <reactbts.Form.Control
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    className={className}
                />
                {error &&
                    <reactbts.Form.Text style={{ color: 'red' }} className="text-muted">
                        {error}
                    </reactbts.Form.Text>
                }
            </reactbts.Form.Group>

            {/* {error && <p>{error}</p>} */}
        </React.Fragment>
    )
}

FormInput.defaultProps = {
    type: "text",
    className: ""
}

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'password']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}
export const Button = (props) => (
    <reactbts.Button
        type={props.type}
        className={props.className !== "" ? props.className : ""}
        onClick={props.handleClick}
        variant={props.variant !== "" ? props.variant : ""}
    >
        {props.label}
    </reactbts.Button>
)