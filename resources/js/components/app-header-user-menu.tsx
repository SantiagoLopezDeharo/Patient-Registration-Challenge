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
                    className="group flex items-center gap-3 rounded-full border border-border bg-card py-1.5 pr-3 pl-2 text-sm font-medium transition-all hover:border-sidebar-ring hover:shadow-sm focus:border-border focus:ring-4 focus:ring-ring focus:outline-none data-[state=open]:border-border data-[state=open]:ring-4 data-[state=open]:ring-ring"
                    aria-label="User menu"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground transition-transform group-hover:scale-105">
                        {getInitials(auth.user.name)}
                    </div>
                    <span className="hidden text-foreground sm:inline-block">
                        {auth.user.name}
                    </span>
                    <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={8}
                    className="z-50 w-64 origin-top-right rounded-xl border border-border bg-card p-2 shadow-xl ring-1 ring-black/5 focus:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                >
                    <div className="mb-2 rounded-lg bg-background px-3 py-2.5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-sm font-bold text-foreground shadow-sm">
                                <User className="h-5 w-5" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {auth.user.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                    {auth.user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <DropdownMenu.Separator className="my-1 h-px bg-border" />

                    <DropdownMenu.Item
                        className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors outline-none hover:bg-destructive/10 focus:bg-destructive/10"
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
