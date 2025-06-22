'use client';

import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { updateAvatarAction } from '@/app/actions';
import type { User } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

interface ProfileAvatarProps {
    user: User;
}

const initialState = {
    message: null,
};

export function ProfileAvatar({ user }: ProfileAvatarProps) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateAvatarAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state?.message) {
            toast({
                title: 'تحديث الصورة الشخصية',
                description: state.message,
            });
        }
    }, [state, toast]);

    const handleFileChange = () => {
        // Automatically submit the form when a file is chosen
        if (fileInputRef.current?.files?.length) {
            formRef.current?.requestSubmit();
        }
    };

    return (
        <form action={formAction} ref={formRef}>
            <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={user.avatar} alt={`صورة ${user.name}`} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <Camera className="h-8 w-8 text-white" />
                    <span className="sr-only">تغيير الصورة الشخصية</span>
                </label>
                <input
                    type="file"
                    id="avatar-upload"
                    name="avatar-upload"
                    className="sr-only"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>
        </form>
    );
}
