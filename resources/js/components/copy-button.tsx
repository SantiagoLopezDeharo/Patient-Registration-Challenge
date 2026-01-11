import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
    text: string;
    size?: number;
    className?: string;
    ariaLabel?: string;
}

export default function CopyButton(props: Readonly<CopyButtonProps>) {
    const { text, size = 16, className = '', ariaLabel } = props;
    const [copied, setCopied] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            if (
                typeof navigator !== 'undefined' &&
                navigator.clipboard?.writeText
            ) {
                await navigator.clipboard.writeText(text);
            } else {
                throw new Error('Clipboard API not available');
            }

            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            // report error for visibility
            // eslint-disable-next-line no-console
            console.error('copy failed', err);
            setCopied(false);
        }
    };

    return (
        <button
            type="button"
            aria-label={ariaLabel ?? `Copy ${text}`}
            onClick={handleClick}
            className={
                'ml-2 inline-flex h-6 w-6 items-center justify-center rounded-md border border-transparent bg-white text-gray-400 hover:text-gray-600 focus:outline-none ' +
                className
            }
            onMouseDown={(e) => e.stopPropagation()}
        >
            {copied ? (
                <Check size={size} className="text-green-500" />
            ) : (
                <Copy size={size} />
            )}
        </button>
    );
}
