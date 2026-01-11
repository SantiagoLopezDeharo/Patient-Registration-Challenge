import { PropsWithChildren } from 'react';
import ThemeToggle from '@/components/theme-toggle';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-background pt-6 sm:pt-0">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Patient registration app
                </h1>
            </div>

            <div className="w-full max-w-md overflow-hidden bg-card px-6 py-4 shadow-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
