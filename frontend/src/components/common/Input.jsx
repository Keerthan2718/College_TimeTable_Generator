function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  required = false,
}) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full
          border
          border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-800
          text-gray-900
          dark:text-gray-100
          placeholder-gray-500
          dark:placeholder-gray-400
          rounded-lg
          p-3
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}

export default Input;