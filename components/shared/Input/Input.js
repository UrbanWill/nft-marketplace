import PropTypes from "prop-types";
import { useField } from "formik";

import { INPUT_MAX_LENGTH } from "../../../utils/constants";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  onHandleChange: PropTypes.func,
  maxLength: PropTypes.number,
};

const Input = ({
  name,
  type,
  onHandleChange,
  placeholder,
  errorMessage,
  label,
  maxLength,
}) => {
  const [field, meta] = useField(name);

  const hasError = meta.touched && !!meta.error;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="font-medium pb-2" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        className={`border rounded p-4  ${
          hasError ? "border-4 border-red-500" : ""
        }`}
        onChange={onHandleChange}
        type={type}
        maxLength={maxLength}
        {...field}
      />
      {hasError && <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

Input.propTypes = propTypes;

Input.defaultProps = {
  type: "text",
  placeholder: "",
  errorMessage: "This is a required field",
  label: "",
  maxLength: INPUT_MAX_LENGTH,
  onHandleChange: null,
};
export default Input;
