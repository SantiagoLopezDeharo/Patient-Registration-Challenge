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
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { route } from 'ziggy-js';
import CreatePatientDialog from '../components/create-patient-dialog';

interface Patient {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    document_photo_path: string;
}

type RenderedPatient = Patient & {
    _status: 'entering' | 'leaving' | 'stable';
};

function stripLeaving(list: RenderedPatient[]) {
    return list.filter((p) => p._status !== 'leaving');
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
                preserveState: true,
                replace: true,
            },
        );
    }, [field, perPage, query]);

    const clearSearch = useCallback(() => {
        setQuery('');
        router.get(
            route('home'),
            { per_page: perPage },
            { preserveScroll: true, preserveState: true, replace: true },
        );
    }, [perPage]);

    const onSentinelVisible = useCallback(() => {
        loadMore();
    }, [loadMore]);

    return (
        <div className="min-h-screen bg-background">
            <Head title="Patient Registry" />

            <nav className="border-b border-border bg-card shadow-md backdrop-blur-sm">
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
                            <FlipGrid items={items} />

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
                                    <div className="mt-4 text-center text-sm text-muted-foreground">
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

function FlipGrid({
    items,
}: Readonly<{
    items: Patient[];
}>) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const positions = useRef(new Map<number, DOMRect>());
    const [rendered, setRendered] = useState<RenderedPatient[]>(() =>
        items.map((i) => ({ ...i, _status: 'stable' })),
    );

    useEffect(() => {
        setRendered((prevRendered) => {
            const nextIds = new Set(items.map((i) => i.id));
            const prevIds = new Set(prevRendered.map((r) => r.id));

            const toAdd: RenderedPatient[] = items
                .filter((i) => !prevIds.has(i.id))
                .map((i) => ({ ...i, _status: 'entering' }));
            const toKeep: RenderedPatient[] = items
                .filter((i) => prevIds.has(i.id))
                .map((i) => ({ ...i, _status: 'stable' }));
            const toRemove: RenderedPatient[] = prevRendered
                .filter((r) => !nextIds.has(r.id))
                .map((r) => ({ ...r, _status: 'leaving' }));

            const merged: RenderedPatient[] = [...toKeep, ...toAdd];
            if (toRemove.length > 0) merged.push(...toRemove);
            return merged;
        });
    }, [items]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const prev = new Map(positions.current);
        const children = Array.from(container.children) as HTMLElement[];

        const newPositions = new Map<number, DOMRect>();
        children.forEach((child) => {
            const key = Number(child.dataset.key);
            if (!Number.isNaN(key)) {
                newPositions.set(key, child.getBoundingClientRect());
            }
        });

        // FLIP via Web Animations API for more reliable playback
        children.forEach((child) => {
            const key = Number(child.dataset.key);
            if (Number.isNaN(key)) return;
            const prevRect = prev.get(key);
            const newRect = newPositions.get(key);
            const status = child.dataset.status;

            // Reorder animation (invert)
            if (prevRect && newRect) {
                const dx = prevRect.left - newRect.left;
                const dy = prevRect.top - newRect.top;
                if (dx !== 0 || dy !== 0) {
                    child.animate(
                        [
                            { transform: `translate(${dx}px, ${dy}px)` },
                            { transform: 'translate(0, 0)' },
                        ],
                        { duration: 260, easing: 'cubic-bezier(.2,.9,.2,1)' },
                    );
                }
            }

            // Enter animation
            if (status === 'entering') {
                // ensure initial state
                child.style.opacity = '0';
                child.style.transform = 'scale(0.98)';
                const anim = child.animate(
                    [
                        { opacity: 0, transform: 'scale(0.98)' },
                        { opacity: 1, transform: 'scale(1)' },
                    ],
                    {
                        duration: 200,
                        easing: 'cubic-bezier(.2,.9,.2,1)',
                        fill: 'forwards',
                    },
                );
                anim.play();
            }

            // Leave animation
            if (status === 'leaving') {
                const anim = child.animate(
                    [
                        { opacity: 1, transform: 'scale(1)' },
                        { opacity: 0, transform: 'scale(0.96)' },
                    ],
                    {
                        duration: 200,
                        easing: 'cubic-bezier(.2,.9,.2,1)',
                        fill: 'forwards',
                    },
                );
                anim.play();
            }
        });

        positions.current = newPositions;
    });

    useEffect(() => {
        const leaving = rendered.filter((r) => r._status === 'leaving');
        if (leaving.length === 0) return;
        const t = setTimeout(() => {
            setRendered(stripLeaving);
        }, 260);
        return () => clearTimeout(t);
    }, [rendered]);

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
            {rendered.map((patient) => {
                const status = patient._status;
                return (
                    <div
                        key={patient.id}
                        data-key={patient.id}
                        data-status={status}
                        style={{
                            opacity: status === 'entering' ? 0 : 1,
                            transform:
                                status === 'entering'
                                    ? 'scale(0.98)'
                                    : undefined,
                            willChange: 'transform, opacity',
                        }}
                    >
                        <PatientCard patient={patient} />
                    </div>
                );
            })}
        </div>
    );
}
