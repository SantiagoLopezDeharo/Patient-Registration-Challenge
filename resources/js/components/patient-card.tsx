import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

interface Patient {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    document_photo_path: string;
}

export default function PatientCard({ patient }: { patient: Patient }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={cn(
                'cursor-pointer rounded-xl border bg-white text-gray-950 shadow transition-all duration-300 hover:shadow-md',
                expanded && 'ring-2 ring-blue-500/10',
            )}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="p-4">
                <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gray-100">
                        <img
                            src={patient.document_photo_path}
                            alt={patient.full_name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">
                                {patient.full_name}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600"
                            >
                                {expanded ? (
                                    <ChevronUp size={20} />
                                ) : (
                                    <ChevronDown size={20} />
                                )}
                            </button>
                        </div>

                        {expanded && (
                            <div className="mt-4 animate-in space-y-2 text-sm text-gray-600 duration-200 fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-gray-400" />
                                    <span>{patient.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone
                                        size={16}
                                        className="text-gray-400"
                                    />
                                    <span>{patient.phone_number}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
