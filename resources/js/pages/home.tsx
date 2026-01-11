import { AppHeaderUserMenu } from '@/components/app-header-user-menu';
import CreatePatientDialog from '@/components/create-patient-dialog';
import EmptyPatientState from '@/components/empty-patient-state';
import PatientCard from '@/components/patient-card';
import { Head } from '@inertiajs/react';

interface Patient {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    document_photo_path: string;
}

export default function Home({ patients }: { patients: { data: Patient[] } }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Patient Registry" />

            <nav className="border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <span className="text-xl font-bold text-gray-900">
                                    Patient Registry
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <CreatePatientDialog />
                            <AppHeaderUserMenu />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {patients.data.length === 0 ? (
                        <EmptyPatientState />
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {patients.data.map((patient) => (
                                <PatientCard
                                    key={patient.id}
                                    patient={patient}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
