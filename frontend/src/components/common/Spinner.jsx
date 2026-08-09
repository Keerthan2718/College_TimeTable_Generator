function Spinner({ size = "md" }) {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        border-4
        border-blue-500
        border-t-transparent
        rounded-full
        animate-spin
      `}
    />
  );
}

export default Spinner;