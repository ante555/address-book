import { useState } from "react";
import "./formInput.scss";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="label--style">{label}</label>
      <input
        className="input--style"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === "password" && setFocused(true)}
        focused={focused.toString()}
      />
      <span className="span--style">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
