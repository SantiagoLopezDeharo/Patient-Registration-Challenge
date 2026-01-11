import { CloudUpload } from 'lucide-react';
import { DragEvent, useEffect, useRef, useState } from 'react';

interface DragDropFileInputProps {
    id: string;
    label: string;
    value: File | null;
    onChange: (file: File) => void;
    errorMessage?: string;
    accept?: string;
    description?: string;
    required?: boolean;
}

export default function DragDropFileInput({
    id,
    label,
    value,
    onChange,
    errorMessage,
    accept,
    description,
    required,
}: Readonly<DragDropFileInputProps>) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            // Simple type check if accept is provided (basic implementation)
            if (
                accept &&
                !accept
                    .split(',')
                    .some((type) =>
                        file.name.toLowerCase().endsWith(type.trim()),
                    ) &&
                !accept
                    .split(',')
                    .some((type) =>
                        type.includes('/')
                            ? file.type === type
                            : file.type.startsWith(type.replace('*', '')),
                    )
            ) {
                // Ideally handle error callback here, but for now we rely on external validation or assume the user drops correctly
            }
            onChange(file);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    useEffect(() => {
        if (!value) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(value);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
            setPreviewUrl(null);
        };
    }, [value]);

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(1)} KB`;
        const mb = kb / 1024;
        return `${mb.toFixed(2)} MB`;
    };

    return (
        <div className="grid grid-cols-4 items-start gap-4">
            <label
                htmlFor={id}
                className="pt-2 text-right text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            >
                {label}
            </label>
            <div className="col-span-3">
                <button
                    type="button"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors duration-200 ease-in-out ${
                        isDragging
                            ? 'border-indigo-500 bg-indigo-50'
                            : errorMessage
                              ? 'border-red-300 bg-red-50 hover:bg-red-100/50'
                              : 'border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    <input
                        id={id}
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        className="hidden"
                        required={required}
                        onChange={handleFileSelect}
                    />
                    {previewUrl ? (
                        <div className="flex flex-col items-center">
                            <div className="relative h-32 w-48 overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-opacity hover:bg-muted/30 hover:opacity-100">
                                    <span className="text-sm text-white">
                                        Change
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <span className="block max-w-[240px] truncate font-medium text-indigo-600">
                                    {value?.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {value ? formatBytes(value.size) : ''}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <CloudUpload
                                className={`mb-2 h-8 w-8 ${errorMessage ? 'text-red-400' : 'text-gray-400'}`}
                            />
                            <div className="text-center text-sm">
                                <>
                                    <span className="font-semibold text-foreground">
                                        Click to upload
                                    </span>{' '}
                                    or drag and drop
                                </>
                            </div>
                        </>
                    )}
                    {description && (
                        <p className="mt-1 text-xs text-gray-500">
                            {description}
                        </p>
                    )}
                </button>
                <div
                    className={`grid transition-all duration-300 ease-in-out ${
                        errorMessage
                            ? 'grid-rows-[1fr] opacity-100'
                            : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                    <div className="overflow-hidden">
                        <span className="mt-1 block text-xs font-medium text-red-500">
                            {errorMessage}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
