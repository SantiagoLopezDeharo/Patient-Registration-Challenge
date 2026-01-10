import { InputHTMLAttributes } from 'react';

interface DialogFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    errorMessage?: string;
}

export default function DialogFormField({
    id,
    label,
    errorMessage,
    className = '',
    ...props
}: DialogFormFieldProps) {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <label
                htmlFor={id}
                className="text-right text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            >
                {label}
            </label>
            <div className="col-span-3">
                <input
                    id={id}
                    className={`flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                    {...props}
                />
                {errorMessage && (
                    <span className="text-sm text-red-500">{errorMessage}</span>
                )}
            </div>
        </div>
    );
}
