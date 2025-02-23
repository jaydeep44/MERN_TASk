const InputField = ({ label, icon, error, ...rest }) => {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        <input
          className={`border px-2 py-1 rounded-md w-full ${icon ? "pl-8" : ""}`}
          {...rest}
        />
      </div>
      {error && <p className="text-red-600 text-xs">{error.message}</p>}
    </div>
  );
};

export default InputField;
