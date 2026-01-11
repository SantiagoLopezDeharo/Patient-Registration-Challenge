interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title = 'Confirm',
    message = 'Are you sure?',
    confirmText = 'Yes',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onCancel}
        >
            <div className="absolute inset-0 bg-black/40" />

            <div
                className="relative z-10 w-full max-w-sm rounded-lg bg-white p-4 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{message}</p>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-md bg-white px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
