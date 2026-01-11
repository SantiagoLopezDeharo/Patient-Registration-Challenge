import { type SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export function AppHeaderUserMenu() {
    const { auth } = usePage<SharedData>().props;
    const [open, setOpen] = useState(false);

    function getInitials(name: string) {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
                <button
                    className="group flex items-center gap-3 rounded-full border border-gray-200 bg-white py-1.5 pr-3 pl-2 text-sm font-medium transition-all hover:border-gray-300 hover:shadow-sm focus:border-gray-400 focus:ring-4 focus:ring-gray-100 focus:outline-none data-[state=open]:border-gray-900 data-[state=open]:ring-4 data-[state=open]:ring-gray-100"
                    aria-label="User menu"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white transition-transform group-hover:scale-105">
                        {getInitials(auth.user.name)}
                    </div>
                    <span className="hidden text-gray-700 sm:inline-block">
                        {auth.user.name}
                    </span>
                    <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={8}
                    className="z-50 w-64 origin-top-right rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 focus:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                >
                    <div className="mb-2 rounded-lg bg-gray-50 px-3 py-2.5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-900 shadow-sm">
                                <User className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="truncate text-sm font-medium text-gray-900">
                                    {auth.user.name}
                                </p>
                                <p className="truncate text-xs text-gray-500">
                                    {auth.user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <DropdownMenu.Separator className="my-1 h-px bg-gray-100" />

                    <DropdownMenu.Item
                        className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors outline-none hover:bg-red-50 focus:bg-red-50"
                        onSelect={handleLogout}
                    >
                        <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        Log out
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
