'use client';

import { useTransition } from 'react';
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions";
import { Spinner } from './icons';

export function LogoutMenuItem() {
    const [isPending, startTransition] = useTransition();

    return (
        <DropdownMenuItem
            onSelect={() => {
                startTransition(() => {
                    logoutAction();
                });
            }}
            disabled={isPending}
            className="cursor-pointer"
        >
            {isPending ? (
                <Spinner className="me-2 h-4 w-4" />
            ) : (
                <LogOut className="me-2 h-4 w-4" />
            )}
            <span>{isPending ? 'جاري الخروج...' : 'تسجيل الخروج'}</span>
        </DropdownMenuItem>
    );
}
