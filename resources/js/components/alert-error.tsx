import { AlertCircleIcon } from 'lucide-react';

export default function AlertError({
    errors,
    title,
}: {
    errors: string[];
    title?: string;
}) {
    return (
        <div className="relative w-full rounded-lg border border-destructive/50 p-4 pl-12 text-sm text-destructive dark:border-destructive [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-destructive [&>svg+div]:translate-y-[-3px]">
            <AlertCircleIcon className="h-4 w-4" />
            <h5 className="mb-1 font-medium leading-none tracking-tight">
                {title || 'Something went wrong.'}
            </h5>
            <div className="[&_p]:leading-relaxed">
                <ul className="list-inside list-disc text-sm">
                    {Array.from(new Set(errors)).map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
