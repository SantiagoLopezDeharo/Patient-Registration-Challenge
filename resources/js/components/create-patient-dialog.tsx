import DialogFormField from '@/components/dialog-form-field';
import { useForm } from '@inertiajs/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { route } from 'ziggy-js';

export default function CreatePatientDialog() {
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
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
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
                            Register a new patient here. Click save when you're
                            done.
                        </DialogPrimitive.Description>
                    </div>
                    <form onSubmit={submit} className="grid gap-4 py-4">
                        <DialogFormField
                            id="name"
                            label="Name"
                            value={data.full_name}
                            onChange={(e) =>
                                setData('full_name', e.target.value)
                            }
                            required
                            errorMessage={errors.full_name}
                        />
                        <DialogFormField
                            id="email"
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            errorMessage={errors.email}
                        />
                        <DialogFormField
                            id="phone"
                            label="Phone"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData('phone_number', e.target.value)
                            }
                            required
                            errorMessage={errors.phone_number}
                        />
                        <DialogFormField
                            id="photo"
                            label="Photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    'document_photo',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            required
                            errorMessage={errors.document_photo}
                        />
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
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
