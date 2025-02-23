const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-600 text-white px-2 h-8 rounded-md mt-4 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
