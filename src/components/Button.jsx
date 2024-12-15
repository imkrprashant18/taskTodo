/* eslint-disable react/prop-types */
const Button = ({
  label = "Click Me",
  onClick,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
