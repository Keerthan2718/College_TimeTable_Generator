function Dropdown({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
}) {
  return (
    <div>
      {label && (
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          border
          border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-800
          text-gray-900
          dark:text-gray-100
          rounded-lg
          px-4
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      >
        <option
          value=""
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;