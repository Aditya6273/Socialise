/* eslint-disable react/prop-types */

  export const DeleteModal = ({
    isOpen,
    error,
    onConfirm,
    onCancel,
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-zinc-900 rounded-lg p-6 max-w-sm w-full border border-zinc-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-100">
            Are you sure you want to delete this post?
          </h3>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <div className="flex space-x-4">
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
            >
              Yes, Delete
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-zinc-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };