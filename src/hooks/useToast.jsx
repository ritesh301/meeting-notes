import { toast } from "react-toastify";

export default function useToast() {
  const showSuccess = (message) => {
    toast.success(message, { autoClose: 2000 });
  };

  const showError = (message) => {
    toast.error(message, { autoClose: 3000 });
  };

  const showUndo = (message, onUndo) => {
    toast.info(
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button
          onClick={onUndo}
          className="bg-purple-600 text-white px-2 py-1 rounded-lg hover:bg-purple-700 w-[100px]"
        >
          Undo
        </button>
      </div>,
      { autoClose: 5000 }
    );
  };

  return { showSuccess, showError, showUndo };
}
