import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 pt-6 sm:pt-0">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Patient registration app
                </h1>
            </div>

            <div className="w-full max-w-md overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
