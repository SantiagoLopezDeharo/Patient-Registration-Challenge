import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
// route is not used here; deletion handled in DeletePatientButton
import CopyButton from './copy-button';
import DeletePatientButton from './delete-patient-button';

interface Patient {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    document_photo_path: string;
}

export default function PatientCard({
    patient,
}: Readonly<{ patient: Patient }>) {
    const [expanded, setExpanded] = useState(false);

    return (
        <button
            type="button"
            className={cn(
                'group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white text-left text-gray-950 shadow-sm transition-shadow duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-gray-900/10 focus-visible:outline-none sm:aspect-square',
                expanded && 'ring-2 ring-gray-900/10',
            )}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
        >
            <div
                className={cn(
                    'absolute inset-0 flex flex-col items-center justify-center px-3 text-center transition-all duration-300 sm:px-6',
                    expanded
                        ? 'pointer-events-none translate-y-2 opacity-0'
                        : 'translate-y-0 opacity-100',
                )}
            >
                <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-sm ring-2 ring-gray-900/5 sm:h-20 sm:w-20">
                    <img
                        src={patient.document_photo_path}
                        alt={patient.full_name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <h3 className="mt-2 max-w-[14rem] truncate text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
                    {patient.full_name}
                </h3>
                <div className="mt-1 text-xs text-gray-400 sm:text-sm">
                    <span className="sm:hidden">Tap for details</span>
                    <span className="hidden sm:inline">
                        Tap to view details
                    </span>
                </div>
            </div>

            <div
                className={cn(
                    'absolute inset-0 flex flex-col p-3 transition-all duration-300 sm:p-4',
                    expanded
                        ? 'translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-1 opacity-0',
                )}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-gray-900/5 sm:h-12 sm:w-12">
                            <img
                                src={patient.document_photo_path}
                                alt={patient.full_name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold tracking-tight text-gray-900 sm:text-base">
                                {patient.full_name}
                            </h3>
                            <div className="mt-0.5 text-xs text-gray-400">
                                Patient
                            </div>
                        </div>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors group-hover:text-gray-600">
                        {expanded ? (
                            <ChevronUp size={18} />
                        ) : (
                            <ChevronDown size={18} />
                        )}
                    </div>
                </div>

                <div className="mt-3 h-px w-full bg-gray-100 sm:mt-4" />

                <div className="mt-3 space-y-2 text-xs text-gray-700 sm:mt-4 sm:space-y-3 sm:text-sm">
                    <div className="flex items-center gap-2">
                        <Mail
                            size={16}
                            className="mt-0.5 shrink-0 text-gray-400"
                        />
                        <span className="min-w-0 break-words">
                            {patient.email}
                        </span>
                        <CopyButton
                            text={patient.email}
                            ariaLabel="Copy email"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone
                            size={16}
                            className="mt-0.5 shrink-0 text-gray-400"
                        />
                        <span className="min-w-0 break-words">
                            {patient.phone_number}
                        </span>
                        <CopyButton
                            text={patient.phone_number}
                            ariaLabel="Copy phone number"
                        />
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <div className="text-xs text-gray-400">
                        <span className="sm:hidden">Tap to collapse</span>
                        <span className="hidden sm:inline">
                            Click anywhere to collapse
                        </span>
                    </div>

                    <div>
                        <DeletePatientButton
                            patientId={patient.id}
                            onSuccess={() => globalThis.location.reload()}
                        />
                    </div>
                </div>
            </div>
        </button>
    );
}
