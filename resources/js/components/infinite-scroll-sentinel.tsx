import { useEffect, useRef } from 'react';

interface InfiniteScrollSentinelProps {
    onVisible: () => void;
    disabled?: boolean;
    rootMargin?: string;
}

export default function InfiniteScrollSentinel({
    onVisible,
    disabled = false,
    rootMargin = '300px',
}: Readonly<InfiniteScrollSentinelProps>) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled) return;
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) onVisible();
            },
            { rootMargin },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [disabled, onVisible, rootMargin]);

    return <div ref={ref} className="h-px w-full" />;
}
