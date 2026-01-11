import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

export default function ThemeToggle() {
    const { appearance, resolvedAppearance, updateAppearance } =
        useAppearance();

    const isDark = resolvedAppearance === 'dark';

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        // toggle between explicit light/dark (avoid setting 'system' here)
        updateAppearance(isDark ? 'light' : 'dark');
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            updateAppearance(isDark ? 'light' : 'dark');
        }
    };

    return (
        <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggle}
            onKeyDown={onKeyDown}
            aria-pressed={isDark}
            title={
                appearance === 'system'
                    ? `Using system (${resolvedAppearance})`
                    : `Appearance: ${appearance}`
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-card text-muted-foreground shadow-sm ring-ring/5 hover:bg-background focus:outline-none"
        >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
    );
}
