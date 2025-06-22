'use client';

import { useState } from 'react';
import { doctors, patients } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendWelcomeMessageAction } from '@/app/actions';
import { Spinner } from '@/components/icons';
import type { Doctor, Patient } from '@/lib/types';

type UserRow = {
    id: string;
    name: string;
    email: string;
    joinDate: string;
    userType: 'طبيب' | 'مريض';
    rawUserType: 'doctor' | 'patient';
};

export default function UsersPage() {
    const { toast } = useToast();
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

    const handleSendMessage = async (user: UserRow) => {
        setLoadingUserId(user.id);
        const result = await sendWelcomeMessageAction(user.name, user.rawUserType);
        setLoadingUserId(null);

        if (result.success && result.subject && result.message) {
            toast({
                title: `تم إنشاء رسالة لـ ${user.name}`,
                description: (
                    <div className="text-sm rtl:text-right ltr:text-left w-full mt-2">
                        <p className="font-bold">{result.subject}</p>
                        <p className="mt-2 whitespace-pre-wrap">{result.message}</p>
                    </div>
                ),
                duration: 8000,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'خطأ',
                description: result.message,
            });
        }
    };
    
    const allUsers: UserRow[] = [
        ...doctors.map(d => ({ 
            id: d.id, 
            name: d.name, 
            email: d.email,
            joinDate: d.submissionDate || new Date().toISOString().split('T')[0],
            userType: 'طبيب' as const,
            rawUserType: 'doctor' as const
        })),
        ...patients.map(p => ({
            id: p.id,
            name: p.name,
            email: p.email,
            joinDate: p.joinDate,
            userType: 'مريض' as const,
            rawUserType: 'patient' as const
        }))
    ].sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());


    const userTypeMap: { [key: string]: { className: string } } = {
        'طبيب': { className: "border-primary/50 bg-primary/10 text-primary-foreground" },
        'مريض': { className: "border-muted-foreground/50 bg-muted/40 text-muted-foreground" },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>إدارة المستخدمين</CardTitle>
                <CardDescription>عرض وإدارة جميع المستخدمين المسجلين في المنصة.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>الاسم</TableHead>
                            <TableHead className="hidden md:table-cell">البريد الإلكتروني</TableHead>
                            <TableHead>نوع المستخدم</TableHead>
                            <TableHead className="hidden md:table-cell">تاريخ الانضمام</TableHead>
                            <TableHead className="text-center">إجراء</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allUsers.length > 0 ? (
                            allUsers.map((user) => (
                                <TableRow key={`${user.rawUserType}-${user.id}`}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={userTypeMap[user.userType].className}>{user.userType}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {new Date(user.joinDate).toLocaleDateString('ar-EG')}
                                    </TableCell>
                                    <TableCell className="text-center">
                                         <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => handleSendMessage(user)}
                                            disabled={loadingUserId === user.id}
                                        >
                                            {loadingUserId === user.id ? <Spinner className="me-2"/> : <Mail className="me-2 h-4 w-4" />}
                                            إرسال ترحيب
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    لا يوجد مستخدمون لعرضهم.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
