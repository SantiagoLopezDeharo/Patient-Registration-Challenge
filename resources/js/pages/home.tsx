import PatientCard from '@/components/patient-card';
import { Head, useForm } from '@inertiajs/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { route } from 'ziggy-js';

interface Patient {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    document_photo_path: string;
}

export default function Home({ patients }: { patients: { data: Patient[] } }) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email: '',
        phone_number: '',
        document_photo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('patients.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

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
                        <div className="flex items-center">
                            <DialogPrimitive.Root
                                open={open}
                                onOpenChange={setOpen}
                            >
                                <DialogPrimitive.Trigger asChild>
                                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow hover:bg-gray-900/90 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                                        Add Patient
                                    </button>
                                </DialogPrimitive.Trigger>
                                <DialogPrimitive.Portal>
                                    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
                                    <DialogPrimitive.Content className="fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 text-gray-900 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:rounded-lg">
                                        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                                            <DialogPrimitive.Title className="text-lg leading-none font-semibold tracking-tight">
                                                Add Patient
                                            </DialogPrimitive.Title>
                                            <DialogPrimitive.Description className="text-sm text-gray-500">
                                                Register a new patient here.
                                                Click save when you're done.
                                            </DialogPrimitive.Description>
                                        </div>
                                        <form
                                            onSubmit={submit}
                                            className="grid gap-4 py-4"
                                        >
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label
                                                    htmlFor="name"
                                                    className="text-right text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                                >
                                                    Name
                                                </label>
                                                <div className="col-span-3">
                                                    <input
                                                        id="name"
                                                        className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        value={data.full_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                'full_name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.full_name && (
                                                        <span className="text-sm text-red-500">
                                                            {errors.full_name}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label
                                                    htmlFor="email"
                                                    className="text-right text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                                >
                                                    Email
                                                </label>
                                                <div className="col-span-3">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            setData(
                                                                'email',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.email && (
                                                        <span className="text-sm text-red-500">
                                                            {errors.email}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label
                                                    htmlFor="phone"
                                                    className="text-right text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                                >
                                                    Phone
                                                </label>
                                                <div className="col-span-3">
                                                    <input
                                                        id="phone"
                                                        className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        value={
                                                            data.phone_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'phone_number',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.phone_number && (
                                                        <span className="text-sm text-red-500">
                                                            {
                                                                errors.phone_number
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label
                                                    htmlFor="photo"
                                                    className="text-right text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                                                >
                                                    Photo
                                                </label>
                                                <div className="col-span-3">
                                                    <input
                                                        id="photo"
                                                        type="file"
                                                        accept="image/*"
                                                        className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        onChange={(e) =>
                                                            setData(
                                                                'document_photo',
                                                                e.target.files
                                                                    ? e.target
                                                                          .files[0]
                                                                    : null,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {errors.document_photo && (
                                                        <span className="text-sm text-red-500">
                                                            {
                                                                errors.document_photo
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-900/90 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    Save changes
                                                </button>
                                            </div>
                                        </form>
                                        <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500">
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">
                                                Close
                                            </span>
                                        </DialogPrimitive.Close>
                                    </DialogPrimitive.Content>
                                </DialogPrimitive.Portal>
                            </DialogPrimitive.Root>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {patients.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
                            <p className="text-xl font-semibold">
                                No patients found
                            </p>
                            <p className="mt-2 text-sm">
                                Get started by registering a new patient.
                            </p>
                        </div>
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
