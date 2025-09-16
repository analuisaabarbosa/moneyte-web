const ConfirmationDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="bg-gray-800 rounded-2xl shadow-lg p-6 m-4 w-full max-w-sm border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <h2 id="modal-title" className="text-xl font-bold text-white mb-4">
            {title}
          </h2>
        </header>

        <div id="modal-description" className="mb-6">
          <p className="text-gray-300">{message}</p>
        </div>

        <footer className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </footer>
      </section>
    </div>
  );
};

export default ConfirmationDeleteModal;
