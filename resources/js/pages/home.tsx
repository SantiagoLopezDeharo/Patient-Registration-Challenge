import { AppHeaderUserMenu } from '@/components/app-header-user-menu';
import EmptyPatientState from '@/components/empty-patient-state';
import InfiniteScrollSentinel from '@/components/infinite-scroll-sentinel';
import PatientCard from '@/components/patient-card';
import PatientSearchControls from '@/components/patient-search-controls';
import ThemeToggle from '@/components/theme-toggle';
import {
    type PatientSearchField,
    useInfinitePatients,
} from '@/hooks/use-infinite-patients';
import type { Paginated } from '@/types/pagination';
import { Head, router } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';
import CreatePatientDialog from '../components/create-patient-dialog';

interface Patient {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    document_photo_path: string;
}

interface HomeFilters {
    q?: string;
    field?: PatientSearchField;
    per_page?: number;
}

export default function Home({
    patients,
    filters,
}: Readonly<{
    patients: Paginated<Patient>;
    filters?: HomeFilters;
}>) {
    const initialQuery = filters?.q ?? '';
    const initialField = filters?.field ?? 'full_name';
    const perPage = filters?.per_page ?? 12;

    const [query, setQuery] = useState(initialQuery);
    const [field, setField] = useState<PatientSearchField>(initialField);

    useEffect(() => {
        setQuery(initialQuery);
        setField(initialField);
    }, [initialField, initialQuery]);

    const activeParams = useMemo(
        () => ({
            q: filters?.q ?? '',
            field: filters?.field ?? 'full_name',
            per_page: filters?.per_page ?? 12,
        }),
        [filters?.field, filters?.per_page, filters?.q],
    );

    const { items, hasMore, isLoadingMore, loadError, loadMore, meta } =
        useInfinitePatients(patients, activeParams);

    const submitSearch = useCallback(() => {
        router.get(
            route('home'),
            {
                q: query || undefined,
                field,
                per_page: perPage,
            },
            {
                preserveScroll: true,
                replace: true,
            },
        );
    }, [field, perPage, query]);

    const clearSearch = useCallback(() => {
        setQuery('');
        router.get(
            route('home'),
            { per_page: perPage },
            { preserveScroll: true, replace: true },
        );
    }, [perPage]);

    const onSentinelVisible = useCallback(() => {
        loadMore();
    }, [loadMore]);

    return (
        <div className="min-h-screen bg-background">
            <Head title="Patient Registry" />

            <nav className="border-b border-border bg-card shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <span className="text-xl font-bold text-foreground">
                                    Patient Registry
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <CreatePatientDialog />
                            <ThemeToggle />
                            <AppHeaderUserMenu />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <PatientSearchControls
                            query={query}
                            field={field}
                            onQueryChange={setQuery}
                            onFieldChange={setField}
                            onSubmit={submitSearch}
                            onClear={clearSearch}
                        />
                        <div className="mt-3 text-xs text-muted-foreground">
                            Showing {meta.total} result
                            {meta.total === 1 ? '' : 's'}
                        </div>
                    </div>

                    {items.length === 0 ? (
                        <EmptyPatientState />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                                {items.map((patient) => (
                                    <PatientCard
                                        key={patient.id}
                                        patient={patient}
                                    />
                                ))}
                            </div>

                            <div className="mt-8">
                                {loadError && (
                                    <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {loadError}
                                    </div>
                                )}

                                {hasMore && (
                                    <>
                                        <InfiniteScrollSentinel
                                            disabled={isLoadingMore}
                                            onVisible={onSentinelVisible}
                                        />
                                        <div className="mt-4 text-center text-sm text-muted-foreground">
                                            {isLoadingMore
                                                ? 'Loading more…'
                                                : 'Scroll to load more'}
                                        </div>
                                    </>
                                )}
                                {!hasMore && meta.total > 0 && (
                                    <div className="mt-4 text-center text-sm text-gray-500">
                                        You’ve reached the end.
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
