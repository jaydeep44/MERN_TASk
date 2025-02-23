const SelectBox = ({ label, options, className, onChange }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-gray-700 text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <select
        className="border px-2 h-8 rounded-md w-full"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
