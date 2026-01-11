import { forwardRef, InputHTMLAttributes } from 'react';

export default forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement> & { isError?: boolean }
>(function AuthInput({ className = '', isError = false, ...props }, ref) {
    return (
        <input
            {...props}
            ref={ref}
            className={
                'block w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground shadow-sm transition-all duration-300 placeholder:text-muted-foreground hover:bg-background hover:shadow-md focus:border-primary focus:ring-4 focus:ring-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ' +
                (isError
                    ? 'border-red-300 bg-red-50 text-red-900 placeholder:text-red-300 focus:border-red-500 focus:ring-red-100/50'
                    : '') +
                className
            }
        />
    );
});
