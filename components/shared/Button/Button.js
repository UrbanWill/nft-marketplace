import PropTypes from "prop-types";

const buttonSize = {
  sm: "p-2",
  lg: "p-4",
};

const propTypes = {
  onHandleClick: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  isTypeSubmit: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(buttonSize)),
  icon: PropTypes.node,
};

const Button = ({
  onHandleClick,
  label,
  isDisabled,
  className,
  isTypeSubmit,
  size,
  icon,
}) => (
  <button
    type={isTypeSubmit ? "submit" : "button"}
    className={` text-white font-bold rounded flex justify-center ${
      buttonSize[size]
    } ${className} ${
      isDisabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-pink-500 hover:bg-pink-600"
    }`}
    onClick={onHandleClick}
    disabled={isDisabled}
  >
    {icon}
    {label}
  </button>
);

Button.defaultProps = {
  label: "",
  isDisabled: false,
  className: "",
  isTypeSubmit: false,
  onHandleClick: () => {},
  size: "sm",
  icon: null,
};

Button.propTypes = propTypes;
export default Button;
