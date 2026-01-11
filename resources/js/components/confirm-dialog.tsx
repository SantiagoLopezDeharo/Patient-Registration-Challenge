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
            <div className="absolute inset-0 bg-background/40" />

            <div
                className="relative z-10 w-full max-w-sm rounded-lg bg-card p-4 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-sm font-semibold text-foreground">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{message}</p>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-md bg-card px-3 py-1 text-sm text-muted-foreground hover:bg-background"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-md bg-destructive px-3 py-1 text-sm text-destructive-foreground hover:brightness-90"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
