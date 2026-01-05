export default function Modal({ open, onClose, children }) {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          {children}
          <div className="text-right mt-4">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  