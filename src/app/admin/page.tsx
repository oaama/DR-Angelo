import { doctors, patients } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, User, UserPlus, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { RegistrationsChart } from '@/components/admin/registrations-chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';


export default async function AdminDashboard() {
    const allDoctors = doctors;
    const pendingVerifications = allDoctors.filter(d => d.verificationStatus === 'pending').length;
    const totalPatients = patients.length;

    // --- Chart Data Processing ---
    const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const monthlyCounts = Array(12).fill(0);
    
    allDoctors.forEach(doctor => {
        if (doctor.submissionDate) {
            const monthIndex = new Date(doctor.submissionDate).getMonth(); // 0-11
            monthlyCounts[monthIndex]++;
        }
    });
    
    const chartData = monthNames.map((month, index) => ({
        name: month,
        total: monthlyCounts[index]
    }));

    // --- Recent Submissions Data ---
    const recentSubmissions = [...allDoctors]
        .filter(d => d.submissionDate)
        .sort((a, b) => new Date(b.submissionDate!).getTime() - new Date(a.submissionDate!).getTime())
        .slice(0, 5);

    const statusMap: { [key: string]: { text: string; className: string; } } = {
        pending: { text: "قيد المراجعة", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
        verified: { text: "تم التحقق", className: "bg-green-100 text-green-800 border-green-200" },
        rejected: { text: "مرفوض", className: "bg-red-100 text-red-800 border-red-200" },
    };


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
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <div className="xl:col-span-2">
                   <RegistrationsChart data={chartData} />
                </div>
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                        <CardTitle>آخر طلبات التوثيق</CardTitle>
                        <CardDescription>
                            آخر 5 أطباء قدموا طلبات للتوثيق.
                        </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ms-auto gap-1">
                        <Link href="/admin/verifications">
                            عرض الكل
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>الطبيب</TableHead>
                                <TableHead>الحالة</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentSubmissions.map((doctor) => {
                                    const statusInfo = statusMap[doctor.verificationStatus];
                                    return (
                                        <TableRow key={doctor.id}>
                                            <TableCell>
                                                <div className="font-medium">{doctor.name}</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                {doctor.specialty}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={statusInfo.className} variant="outline">{statusInfo.text}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
