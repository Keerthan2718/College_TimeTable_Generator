function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-md p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;