import PropTypes from "prop-types";

const propTypes = {
  onHandleClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  isTypeSubmit: PropTypes.bool,
};

const Button = ({
  onHandleClick,
  label,
  isDisabled,
  className,
  isTypeSubmit,
}) => (
  <button
    type={isTypeSubmit ? "submit" : "button"}
    className={` text-white font-bold p-4 px-12 rounded ${className} ${
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
};

Button.propTypes = propTypes;
export default Button;
