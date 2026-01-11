import DialogFormField from '@/components/dialog-form-field';
import DragDropFileInput from '@/components/drag-drop-file-input';
import PhoneInput from '@/components/phone-input';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';
import { route } from 'ziggy-js';

interface CreatePatientFormProps {
    onSuccess: () => void;
}

export default function CreatePatientForm({
    onSuccess,
}: Readonly<CreatePatientFormProps>) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            full_name: '',
            email: '',
            country_code: '',
            number: '',
            document_photo: null as File | null,
        });

    const [clientErrors, setClientErrors] = useState<
        Partial<Record<keyof typeof data, string>>
    >({});

    const NAME_RE = useMemo(() => /^[a-zA-Z ]+$/, []);
    const GMAIL_SUFFIX = 'gmail.com';
    const GMAIL_LOCAL_RE = useMemo(() => /^[a-z0-9]+$/i, []);
    const COUNTRY_CODE_RE = useMemo(() => /^\+\d{1,4}$/, []);
    const NUMBER_RE = useMemo(() => /^\d+$/, []);
    const MAX_FILE_BYTES = 10 * 1024 * 1024;

    const validateFullName = (fullNameRaw: string): string | undefined => {
        const fullName = fullNameRaw.trim();
        if (!fullName) return 'Full name is required.';
        if (fullName.length > 255)
            return 'Full name must be 255 characters or less.';
        if (!NAME_RE.test(fullName))
            return 'The full name field must only contain letters.';
        return undefined;
    };

    const validateEmail = (emailRaw: string): string | undefined => {
        const email = emailRaw.trim().toLowerCase();
        const parts = email.split('@');

        if (parts.length !== 2)
            return 'There should be a single @ on the gmail.';

        if (!GMAIL_LOCAL_RE.test(parts[0]))
            return 'Invalid username for gmail.';

        if (parts[1] !== GMAIL_SUFFIX)
            return 'We only allow gmails as patients email.';

        return undefined;
    };

    const validateCountryCode = (
        countryCodeRaw: string,
    ): string | undefined => {
        const countryCode = countryCodeRaw;
        if (!countryCode) return 'Country code is required.';
        if (!COUNTRY_CODE_RE.test(countryCode))
            return 'Invalid country code (e.g. +598).';
        return undefined;
    };

    const validateNumber = (numberRaw: string): string | undefined => {
        const number = numberRaw;
        if (!number) return 'Phone number is required.';
        if (number.length > 15) return 'The number must be 15 digits or less.';
        if (!NUMBER_RE.test(number))
            return 'The number must contain only digits.';
        return undefined;
    };

    const validatePhoto = (photo: File | null): string | undefined => {
        if (photo === null) return 'Document photo is required.';

        const lowerName = photo.name.toLowerCase();
        const extensionOk =
            lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg');
        const mimeOk = photo.type ? photo.type === 'image/jpeg' : true;

        if (!extensionOk || !mimeOk)
            return 'The document photo must be a file of type: jpg.';
        if (photo.size > MAX_FILE_BYTES)
            return 'The document photo must be 10MB or less.';
        return undefined;
    };

    const validate = (values: typeof data) => {
        const nextErrors: Partial<Record<keyof typeof data, string>> = {};

        const fullNameError = validateFullName(values.full_name);
        if (fullNameError) nextErrors.full_name = fullNameError;

        const emailError = validateEmail(values.email);
        if (emailError) nextErrors.email = emailError;

        const countryCodeError = validateCountryCode(values.country_code);
        if (countryCodeError) nextErrors.country_code = countryCodeError;

        const numberError = validateNumber(values.number);
        if (numberError) nextErrors.number = numberError;

        const photoError = validatePhoto(values.document_photo);
        if (photoError) nextErrors.document_photo = photoError;

        return nextErrors;
    };

    const mergedErrorFor = (field: keyof typeof data) => {
        return clientErrors[field] ?? errors[field];
    };

    const setField = <K extends keyof typeof data>(
        field: K,
        value: (typeof data)[K],
    ) => {
        clearErrors(field as any);
        setData(field, value as any);
        setClientErrors((prev) => {
            const next = validate({ ...data, [field]: value } as typeof data);
            if (!prev[field] && !next[field]) return prev;
            const { [field]: _removed, ...rest } = prev;
            return next[field] ? { ...rest, [field]: next[field] } : rest;
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const nextClientErrors = validate(data);
        setClientErrors(nextClientErrors);

        if (Object.keys(nextClientErrors).length > 0) {
            return;
        }

        post(route('patients.store'), {
            onSuccess: () => {
                onSuccess();
                reset();
                setClientErrors({});
            },
        });
    };

    return (
        <form onSubmit={submit} className="grid gap-4 py-4">
            <DialogFormField
                id="name"
                label="Name"
                value={data.full_name}
                onChange={(e) => setField('full_name', e.target.value)}
                onBlur={() => setField('full_name', data.full_name.trim())}
                maxLength={255}
                pattern="[A-Za-z ]+"
                required
                errorMessage={mergedErrorFor('full_name')}
            />
            <DialogFormField
                id="email"
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => setField('email', e.target.value)}
                onBlur={() => setField('email', data.email.trim())}
                maxLength={255}
                required
                errorMessage={mergedErrorFor('email')}
            />

            <PhoneInput
                countryCode={data.country_code}
                number={data.number}
                onCountryCodeChange={(val) => setField('country_code', val)}
                onNumberChange={(val) => setField('number', val)}
                countryCodeError={mergedErrorFor('country_code')}
                numberError={mergedErrorFor('number')}
                required
            />

            <DragDropFileInput
                id="photo"
                label="Photo"
                value={data.document_photo}
                onChange={(file) => setField('document_photo', file)}
                errorMessage={mergedErrorFor('document_photo')}
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
