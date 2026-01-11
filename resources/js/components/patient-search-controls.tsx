import type { PatientSearchField } from '@/hooks/use-infinite-patients';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Search, X } from 'lucide-react';

interface PatientSearchControlsProps {
    query: string;
    field: PatientSearchField;
    onQueryChange: (next: string) => void;
    onFieldChange: (next: PatientSearchField) => void;
    onSubmit: () => void;
    onClear: () => void;
}

const FIELD_LABEL: Record<PatientSearchField, string> = {
    full_name: 'Name',
    email: 'Email',
    phone_number: 'Phone',
};

export default function PatientSearchControls({
    query,
    field,
    onQueryChange,
    onFieldChange,
    onSubmit,
    onClear,
}: Readonly<PatientSearchControlsProps>) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onSubmit();
                            }
                        }}
                        placeholder={`Search by ${FIELD_LABEL[field]}...`}
                        className="h-10 w-full rounded-md border border-gray-200 bg-white pr-10 pl-9 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-500 focus:border-gray-900 focus:ring-4 focus:ring-gray-100 focus:outline-none"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={onClear}
                            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-700 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onSubmit}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white shadow hover:bg-gray-900/90 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none"
                >
                    Search
                </button>
            </div>

            <ToggleGroup.Root
                type="single"
                value={field}
                onValueChange={(val) => {
                    if (!val) return;
                    onFieldChange(val as PatientSearchField);
                }}
                className="inline-flex w-full rounded-lg border border-gray-200 bg-gray-50 p-1 sm:w-auto"
                aria-label="Search field"
            >
                {(Object.keys(FIELD_LABEL) as PatientSearchField[]).map(
                    (key) => (
                        <ToggleGroup.Item
                            key={key}
                            value={key}
                            className="flex-1 rounded-md px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:text-gray-900 data-[state=on]:bg-white data-[state=on]:text-gray-900 data-[state=on]:shadow-sm sm:flex-none"
                        >
                            {FIELD_LABEL[key]}
                        </ToggleGroup.Item>
                    ),
                )}
            </ToggleGroup.Root>
        </div>
    );
}
