'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldCheck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminNav() {
    const pathname = usePathname();

    const links = [
        { href: '/admin', label: 'الرئيسية', icon: Home },
        { href: '/admin/verifications', label: 'توثيق الأطباء', icon: ShieldCheck },
        { href: '/admin/users', label: 'إدارة المستخدمين', icon: Users, disabled: false },
    ];

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map(({ href, label, icon: Icon, disabled }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={disabled ? '#' : href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            isActive && 'bg-muted text-primary',
                            disabled && 'pointer-events-none opacity-50'
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
