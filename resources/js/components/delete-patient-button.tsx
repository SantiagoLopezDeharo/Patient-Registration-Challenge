import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';
import ConfirmDialog from './confirm-dialog';

interface DeletePatientButtonProps {
    patientId: number | string;
    className?: string;
    ariaLabel?: string;
    onSuccess?: () => void;
}

export default function DeletePatientButton(
    props: Readonly<DeletePatientButtonProps>,
) {
    const {
        patientId,
        className = '',
        ariaLabel = 'Delete patient',
        onSuccess,
    } = props;
    const { delete: destroy, processing } = useForm({});

    const [open, setOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(true);
    };

    const confirm = () => {
        setOpen(false);
        destroy(route('patients.destroy', patientId), {
            preserveScroll: true,
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    const cancel = () => setOpen(false);

    return (
        <>
            <button
                type="button"
                aria-label={ariaLabel}
                onClick={handleClick}
                onMouseDown={(e) => e.stopPropagation()}
                disabled={processing}
                className={
                    'inline-flex items-center gap-2 rounded-md bg-white px-2 py-1 text-xs text-red-600 hover:bg-red-50 ' +
                    className
                }
            >
                <Trash2 size={14} />
                <span>Delete</span>
            </button>

            <ConfirmDialog
                open={open}
                title="Delete patient"
                message="Are you sure you want to delete this patient? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirm}
                onCancel={cancel}
            />
        </>
    );
}
