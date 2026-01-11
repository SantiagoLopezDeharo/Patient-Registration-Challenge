import DialogFormField from '@/components/dialog-form-field';
import DragDropFileInput from '@/components/drag-drop-file-input';
import PhoneInput from '@/components/phone-input';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { route } from 'ziggy-js';

interface CreatePatientFormProps {
    onSuccess: () => void;
}

export default function CreatePatientForm({
    onSuccess,
}: CreatePatientFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email: '',
        country_code: '',
        number: '',
        document_photo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('patients.store'), {
            onSuccess: () => {
                onSuccess();
                reset();
            },
        });
    };

    return (
        <form onSubmit={submit} className="grid gap-4 py-4">
            <DialogFormField
                id="name"
                label="Name"
                value={data.full_name}
                onChange={(e) => setData('full_name', e.target.value)}
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

            <PhoneInput
                countryCode={data.country_code}
                number={data.number}
                onCountryCodeChange={(val) => setData('country_code', val)}
                onNumberChange={(val) => setData('number', val)}
                countryCodeError={errors.country_code}
                numberError={errors.number}
                required
            />

            <DragDropFileInput
                id="photo"
                label="Photo"
                value={data.document_photo}
                onChange={(file) => setData('document_photo', file)}
                errorMessage={errors.document_photo}
                accept=".jpg,.jpeg"
                description="JPG or JPEG (MAX. 10MB)"
            />

            <div className="flex flex-col-reverse pt-2 sm:flex-row sm:justify-end sm:space-x-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-900/90 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                    Save changes
                </button>
            </div>
        </form>
    );
}
