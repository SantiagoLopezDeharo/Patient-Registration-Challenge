import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type Id = string | number;

type Status = 'entering' | 'leaving' | 'stable';

type RenderedItem<T extends { id: Id }> = T & {
    _status: Status;
};

export interface FlipGridProps<T extends { id: Id }> {
    items: T[];
    renderItem: (item: T) => ReactNode;
    className?: string;
}

function scheduleMicrotask(cb: () => void) {
    if (typeof queueMicrotask === 'function') {
        queueMicrotask(cb);
        return;
    }
    Promise.resolve().then(cb);
}

export default function FlipGrid<T extends { id: Id }>({
    items,
    renderItem,
    className,
}: Readonly<FlipGridProps<T>>) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const positions = useRef(new Map<string, DOMRect>());
    const [rendered, setRendered] = useState<RenderedItem<T>[]>(() =>
        items.map((i) => ({ ...i, _status: 'stable' })),
    );

    // Keep a version counter to avoid stale microtasks applying out-of-order.
    const updateVersion = useRef(0);

    useEffect(() => {
        updateVersion.current += 1;
        const version = updateVersion.current;

        scheduleMicrotask(() => {
            if (version !== updateVersion.current) return;

            setRendered((prevRendered) => {
                const prevById = new Map<string, RenderedItem<T>>(
                    prevRendered.map((r) => [String(r.id), r]),
                );
                const nextById = new Map<string, T>(
                    items.map((i) => [String(i.id), i]),
                );

                const nextRendered: RenderedItem<T>[] = [];

                // Preserve order of current items, but always use the latest item
                // data so cards don't render stale content.
                for (const item of items) {
                    const prev = prevById.get(String(item.id));
                    const status: Status = prev
                        ? prev._status === 'leaving'
                            ? 'stable'
                            : prev._status
                        : 'entering';
                    nextRendered.push({ ...item, _status: status });
                }

                // Append removed items as leaving (kept for exit animation)
                for (const prev of prevRendered) {
                    if (nextById.has(String(prev.id))) continue;
                    if (prev._status === 'leaving') {
                        nextRendered.push(prev);
                    } else {
                        nextRendered.push({ ...prev, _status: 'leaving' });
                    }
                }

                return nextRendered;
            });
        });
    }, [items]);

    // FLIP animations + enter/leave animations.
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const prevPositions = new Map(positions.current);
        const children = Array.from(container.children) as HTMLElement[];

        const newPositions = new Map<string, DOMRect>();
        for (const child of children) {
            const key = child.dataset.key;
            if (key == null) continue;
            newPositions.set(key, child.getBoundingClientRect());
        }

        const enteringIds: string[] = [];
        const leavingIds: string[] = [];
        const finished: Promise<unknown>[] = [];

        for (const child of children) {
            const key = child.dataset.key;
            if (key == null) continue;

            const prevRect = prevPositions.get(key);
            const newRect = newPositions.get(key);
            const status = child.dataset.status as Status | undefined;

            // Reorder (invert)
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

            if (status === 'entering') {
                enteringIds.push(key);
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
                finished.push(anim.finished);
            }

            if (status === 'leaving') {
                leavingIds.push(key);
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
                finished.push(anim.finished);
            }
        }

        positions.current = newPositions;

        if (enteringIds.length === 0 && leavingIds.length === 0) return;

        // After animations complete, mark entering as stable and remove leaving.
        Promise.allSettled(finished).then(() => {
            setRendered((prev) => {
                const entering = new Set(enteringIds);
                const leaving = new Set(leavingIds);

                const next: RenderedItem<T>[] = [];
                for (const item of prev) {
                    const id = String(item.id);
                    if (leaving.has(id) && item._status === 'leaving') continue;

                    if (entering.has(id) && item._status === 'entering') {
                        next.push({ ...item, _status: 'stable' });
                    } else {
                        next.push(item);
                    }
                }

                return next;
            });
        });
    });

    const gridClassName = useMemo(
        () =>
            className ??
            'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        [className],
    );

    return (
        <div ref={containerRef} className={gridClassName}>
            {rendered.map((item) => {
                const status = item._status;
                return (
                    <div
                        key={String(item.id)}
                        data-key={String(item.id)}
                        data-status={status}
                        style={{
                            opacity: status === 'entering' ? 0 : 1,
                            transform:
                                status === 'entering'
                                    ? 'scale(0.98)'
                                    : undefined,
                            pointerEvents: status === 'leaving' ? 'none' : undefined,
                            willChange: 'transform, opacity',
                        }}
                    >
                        {renderItem(item)}
                    </div>
                );
            })}
        </div>
    );
}
