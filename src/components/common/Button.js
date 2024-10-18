import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "default",
}) => {
  const className = variant === "delete" ? "button-delete" : "button-add";

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["default", "delete"]),
};

export default Button;
