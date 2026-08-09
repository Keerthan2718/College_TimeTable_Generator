function Modal({
  isOpen,
  title,
  children,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg w-full max-w-md p-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-red-500 text-xl"
          >
            ×
          </button>

        </div>

        {children}

      </div>
    </div>
  );
}

export default Modal;