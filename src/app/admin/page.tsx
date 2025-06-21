import { doctors } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, User, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
    const allDoctors = doctors;
    const pendingVerifications = allDoctors.filter(d => d.verificationStatus === 'pending').length;
    // In a real app, we'd have a separate list for patients
    const totalPatients = 250; // Mock data

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline">لوحة التحكم الرئيسية</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">توثيقات قيد المراجعة</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingVerifications}</div>
                        <p className="text-xs text-muted-foreground">
                            {pendingVerifications > 0 ? 
                                <Link href="/admin/verifications" className="underline hover:text-primary">
                                    {pendingVerifications} طبيب ينتظر المراجعة
                                </Link>
                                : "لا توجد طلبات معلقة"
                            }
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">إجمالي الأطباء</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{allDoctors.length}</div>
                         <p className="text-xs text-muted-foreground">طبيب مسجل في المنصة</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">إجمالي المرضى</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{totalPatients}</div>
                         <p className="text-xs text-muted-foreground">مريض مسجل في المنصة</p>
                    </CardContent>
                </Card>
            </div>
            {/* Here we can add more sections like recent activity or charts */}
        </>
    );
}
