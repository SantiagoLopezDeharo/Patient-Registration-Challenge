import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
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
                'group relative aspect-[16/9] w-full transform-gpu cursor-pointer overflow-hidden bg-transparent text-left text-card-foreground sm:aspect-square',
            )}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            style={{ perspective: '1200px' }}
        >
            <div
                className={cn(
                    'relative h-full w-full rounded-2xl border border-border bg-card shadow-md transition duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring/10 focus-visible:outline-none',
                    'transform-gpu transition-transform duration-500',
                    expanded && 'ring-2 ring-gray-900/10',
                    expanded ? 'rotate-y-180' : 'rotate-y-0',
                    'z-20',
                )}
                style={{ transformStyle: 'preserve-3d' }}
                tabIndex={-1}
            >
                {/* Front Side */}
                <div
                    className={cn(
                        'absolute inset-0 flex flex-col items-center justify-center px-3 text-center transition-opacity duration-300 sm:px-6',
                        'backface-hidden',
                    )}
                >
                    <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-sm ring-2 ring-ring/5 sm:h-20 sm:w-20">
                        <img
                            src={patient.document_photo_path}
                            alt={patient.full_name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <h3 className="mt-2 max-w-[14rem] truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
                        {patient.full_name}
                    </h3>
                    <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        <span className="sm:hidden">Tap for details</span>
                        <span className="hidden sm:inline">
                            Tap to view details
                        </span>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className={cn(
                        'absolute inset-0 flex flex-col p-3 transition-opacity duration-300 sm:p-4',
                        'rotate-y-180 backface-hidden',
                    )}
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-ring/5 sm:h-12 sm:w-12">
                                <img
                                    src={patient.document_photo_path}
                                    alt={patient.full_name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
                                    {patient.full_name}
                                </h3>
                                <div className="mt-0.5 text-xs text-muted-foreground">
                                    Patient
                                </div>
                            </div>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors group-hover:text-foreground">
                            {expanded ? (
                                <ChevronUp size={18} />
                            ) : (
                                <ChevronDown size={18} />
                            )}
                        </div>
                    </div>
                    <div className="mt-3 h-px w-full bg-border sm:mt-4" />
                    <div className="mt-3 space-y-2 text-xs text-muted-foreground sm:mt-4 sm:space-y-3 sm:text-sm">
                        <div className="flex items-center gap-2">
                            <Mail
                                size={16}
                                className="mt-0.5 shrink-0 text-muted-foreground"
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
                                className="mt-0.5 shrink-0 text-muted-foreground"
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
                        <div className="text-xs text-muted-foreground">
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
            </div>
            {/* Add flip animation CSS */}
            <style>{`
                .rotate-y-0 { transform: rotateY(0deg); }
                .rotate-y-180 { transform: rotateY(180deg); }
                .backface-hidden { backface-visibility: hidden; }
                .hover {
                    box-shadow: 0 0 10px 2px rgba(0, 123, 255, 0.6);
                }
            `}</style>
        </button>
    );
}
