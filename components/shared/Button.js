import PropTypes from "prop-types";

const buttonSize = {
  sm: "p-2",
  lg: "p-4",
};

const propTypes = {
  onHandleClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  isTypeSubmit: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(buttonSize)),
};

const Button = ({
  onHandleClick,
  label,
  isDisabled,
  className,
  isTypeSubmit,
  size,
}) => (
  <button
    type={isTypeSubmit ? "submit" : "button"}
    className={` text-white font-bold rounded ${
      buttonSize[size]
    } ${className} ${
      isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-pink-500"
    }`}
    onClick={onHandleClick}
    disabled={isDisabled}
  >
    {label}
  </button>
);

Button.defaultProps = {
  isDisabled: false,
  className: "",
  isTypeSubmit: false,
  onHandleClick: () => {},
  size: "sm",
};

Button.propTypes = propTypes;
export default Button;
