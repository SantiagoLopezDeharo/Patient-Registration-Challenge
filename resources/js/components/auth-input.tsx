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
                'block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 hover:bg-white hover:shadow-md focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ' +
                (isError
                    ? 'border-red-300 bg-red-50 text-red-900 placeholder:text-red-300 focus:border-red-500 focus:ring-red-100/50'
                    : '') +
                className
            }
        />
    );
});
