import PropTypes from 'prop-types';
import React from "react";

const InputField = ({
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
      <label className='floating-label' htmlFor={name}>{label}</label>
      <input
      required
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        style={error && {border: 'solid 1px red'}}
      />
      { error && <p>{ error }</p>}
    </React.Fragment>
  )
}

InputField.defaultProps = {
  type: "text",
  className: ""
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
}
export default InputField;
