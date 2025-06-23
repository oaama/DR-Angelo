import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for ads
const ads = [
    {
        id: 'ad1',
        title: 'أفضل عروض عيادات الليزر',
        placement: 'الرئيسية - الشريط الجانبي',
        status: 'نشط',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
    },
    {
        id: 'ad2',
        title: 'خصم خاص على تبييض الأسنان',
        placement: 'صفحة نتائج البحث',
        status: 'منتهي',
        startDate: '2024-05-15',
        endDate: '2024-05-31',
    },
];

const statusMap: { [key: string]: { text: string; className: string; } } = {
    نشط: { text: "نشط", className: "bg-green-100 text-green-800 border-green-200" },
    منتهي: { text: "منتهي", className: "bg-gray-100 text-gray-800 border-gray-200" },
};


export default function AdsManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">إدارة الإعلانات</h1>
                    <p className="text-muted-foreground">إنشاء وتعديل الإعلانات المعروضة في الموقع.</p>
                </div>
                <Button>
                    <PlusCircle className="me-2 h-4 w-4" />
                    إضافة إعلان جديد
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>الإعلانات الحالية</CardTitle>
                    <CardDescription>قائمة بجميع الإعلانات النشطة والسابقة.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>عنوان الإعلان</TableHead>
                                <TableHead className="hidden sm:table-cell">مكان العرض</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead className="hidden md:table-cell">تاريخ البدء</TableHead>
                                <TableHead className="hidden md:table-cell">تاريخ الانتهاء</TableHead>
                                <TableHead>
                                    <span className="sr-only">الإجراءات</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ads.map((ad) => {
                                const statusInfo = statusMap[ad.status];
                                return (
                                <TableRow key={ad.id}>
                                    <TableCell className="font-medium">{ad.title}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{ad.placement}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={statusInfo.className}>
                                            {statusInfo.text}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{new Date(ad.startDate).toLocaleDateString('ar-EG')}</TableCell>
                                    <TableCell className="hidden md:table-cell">{new Date(ad.endDate).toLocaleDateString('ar-EG')}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Pencil className="me-2 h-4 w-4" />
                                                    تعديل
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="me-2 h-4 w-4" />
                                                    حذف
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
