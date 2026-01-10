import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <nav aria-label="breadcrumb">
                    <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <li className="inline-flex items-center gap-1.5">
                                        {isLast ? (
                                            <span
                                                role="link"
                                                aria-disabled="true"
                                                aria-current="page"
                                                className="font-normal text-foreground"
                                            >
                                                {item.title}
                                            </span>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="transition-colors hover:text-foreground"
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </li>
                                    {!isLast && (
                                        <li
                                            role="presentation"
                                            aria-hidden="true"
                                            className="[&>svg]:size-3.5"
                                        >
                                            <ChevronRight />
                                        </li>
                                    )}
                                </Fragment>
                            );
                        })}
                    </ol>
                </nav>
            )}
        </>
    );
}
