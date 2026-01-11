import { useCallback, useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';
import type { Paginated } from '@/types/pagination';

export type PatientSearchField = 'full_name' | 'email' | 'phone_number';

interface UseInfinitePatientsParams {
    q: string;
    field: PatientSearchField;
    per_page: number;
}

export function useInfinitePatients<T>(
    initial: Paginated<T>,
    params: UseInfinitePatientsParams,
) {
    const [items, setItems] = useState<T[]>(() => initial.data);
    const [meta, setMeta] = useState(() => initial.meta);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        setItems(initial.data);
        setMeta(initial.meta);
        setLoadError(null);
    }, [
        initial.data,
        initial.meta,
        initial.meta.current_page,
        initial.meta.last_page,
        initial.meta.total,
        params.q,
        params.field,
        params.per_page,
    ]);

    const hasMore = useMemo(
        () => meta.current_page < meta.last_page,
        [meta.current_page, meta.last_page],
    );

    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);
        setLoadError(null);

        try {
            const nextPage = meta.current_page + 1;
            const url = route('patients.index', {
                page: nextPage,
                q: params.q || undefined,
                field: params.field,
                per_page: params.per_page,
            });

            const res = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to load page ${nextPage}`);
            }

            const json = (await res.json()) as Paginated<T>;

            setItems((prev) => [...prev, ...json.data]);
            setMeta(json.meta);
        } catch (err) {
            setLoadError(err instanceof Error ? err.message : 'Failed to load');
        } finally {
            setIsLoadingMore(false);
        }
    }, [
        hasMore,
        isLoadingMore,
        meta.current_page,
        params.field,
        params.per_page,
        params.q,
    ]);

    return {
        items,
        meta,
        hasMore,
        isLoadingMore,
        loadError,
        loadMore,
    };
}
