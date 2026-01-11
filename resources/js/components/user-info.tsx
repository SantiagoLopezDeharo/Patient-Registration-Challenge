import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <>
            <AvatarPrimitive.Root className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <AvatarPrimitive.Image className="aspect-square size-full" src={user.avatar} alt={user.name} />
                <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    {getInitials(user.name)}
                </AvatarPrimitive.Fallback>
            </AvatarPrimitive.Root>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
