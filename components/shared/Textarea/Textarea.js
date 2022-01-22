import PropTypes from "prop-types";
import { useField } from "formik";

import { TEXTAREA_MAX_LENGTH } from "../../../utils/constants";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  onHandleChange: PropTypes.func,
  maxLength: PropTypes.number,
};

const Textarea = ({
  name,
  onHandleChange,
  placeholder,
  errorMessage,
  label,
  maxLength,
}) => {
  const [field, meta] = useField(name);

  const hasError = meta.touched && !!meta.error;

  return (
    <div className="flex flex-col py-2">
      {label && (
        <label className="font-medium pb-2" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        className={`border rounded p-4 h-26 ${
          hasError ? "border-4 border-red-500" : ""
        }`}
        onChange={onHandleChange}
        maxLength={maxLength}
        {...field}
      />
      {hasError && <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

Textarea.propTypes = propTypes;

Textarea.defaultProps = {
  placeholder: "Example: Asset description",
  errorMessage: "This is a required field",
  label: "",
  maxLength: TEXTAREA_MAX_LENGTH,
  onHandleChange: null,
};
export default Textarea;
