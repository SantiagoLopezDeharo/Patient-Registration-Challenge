interface PhoneInputProps {
    countryCode: string;
    number: string;
    onCountryCodeChange: (value: string) => void;
    onNumberChange: (value: string) => void;
    countryCodeError?: string;
    numberError?: string;
    required?: boolean;
}

export default function PhoneInput({
    countryCode,
    number,
    onCountryCodeChange,
    onNumberChange,
    countryCodeError,
    numberError,
    required = false,
}: PhoneInputProps) {
    return (
        <div className="grid grid-cols-4 items-start gap-4">
            <label className="pt-2 text-right text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                Phone
            </label>
            <div className="col-span-3 flex gap-3">
                <div className="w-24 shrink-0">
                    <input
                        id="country_code"
                        placeholder="+598"
                        className={`flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                            countryCodeError
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : ''
                        }`}
                        value={countryCode}
                        onChange={(e) => onCountryCodeChange(e.target.value)}
                        required={required}
                    />
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${
                            countryCodeError
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                        <div className="overflow-hidden">
                            <span className="mt-1 block text-xs font-medium text-red-500">
                                {countryCodeError}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <input
                        id="number"
                        placeholder="99123456"
                        className={`flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                            numberError
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : ''
                        }`}
                        value={number}
                        onChange={(e) => onNumberChange(e.target.value)}
                        required={required}
                    />
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${
                            numberError
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                        <div className="overflow-hidden">
                            <span className="mt-1 block text-xs font-medium text-red-500">
                                {numberError}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
