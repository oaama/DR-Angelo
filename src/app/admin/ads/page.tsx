
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Trash2, Pencil, Image as ImageIcon, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Mock data for ads - now more detailed
const ads = [
    {
        id: 'ad1',
        type: 'image',
        title: 'أفضل عروض عيادات الليزر',
        description: 'خصومات تصل إلى 50% على جلسات إزالة الشعر بالليزر.',
        placement: 'الرئيسية - الشريط الجانبي',
        status: 'نشط',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
    },
    {
        id: 'ad2',
        type: 'text',
        title: 'استشارة مجانية',
        description: 'احصل على استشارة أولية مجانية عند حجزك مع أي طبيب نفسي هذا الشهر.',
        placement: 'صفحة نتائج البحث',
        status: 'نشط',
        startDate: '2024-07-01',
        endDate: '2024-07-31',
    },
    {
        id: 'ad3',
        title: 'خصم خاص على تبييض الأسنان',
        type: 'image',
        description: 'ابتسامة هوليود بين يديك بخصم 25%.',
        placement: 'صفحة نتائج البحث',
        status: 'منتهي',
        startDate: '2024-05-15',
        endDate: '2024-05-31',
    },
];

const statusMap: { [key: string]: { text: string; className: string; } } = {
    نشط: { text: "نشط", className: "bg-green-100 text-green-800 border-green-200" },
    منتهي: { text: "منتهي", className: "bg-gray-100 text-gray-800 border-gray-200" },
    مسودة: { text: "مسودة", className: "bg-blue-100 text-blue-800 border-blue-200" },
};

const typeMap: { [key: string]: { text: string; icon: React.ElementType } } = {
    image: { text: "إعلان صوري", icon: ImageIcon },
    text: { text: "إعلان نصي", icon: FileText },
};

export default function AdsManagementPage() {
    const [adType, setAdType] = useState('image');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">إدارة الإعلانات</h1>
                    <p className="text-muted-foreground">إنشاء وتعديل الإعلانات المعروضة في الموقع.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="me-2 h-4 w-4" />
                            إضافة إعلان جديد
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>إضافة إعلان جديد</DialogTitle>
                            <DialogDescription>
                                املأ التفاصيل أدناه لإنشاء إعلان جديد.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    عنوان الإعلان
                                </Label>
                                <Input id="title" placeholder="مثال: خصم الصيف" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">نوع الإعلان</Label>
                                <RadioGroup defaultValue="image" className="col-span-3 flex gap-4" onValueChange={setAdType}>
                                    <Label htmlFor="type-image" className="flex items-center gap-2 cursor-pointer">
                                        <RadioGroupItem value="image" id="type-image" />
                                        صورة
                                    </Label>
                                    <Label htmlFor="type-text" className="flex items-center gap-2 cursor-pointer">
                                        <RadioGroupItem value="text" id="type-text" />
                                        نص فقط
                                    </Label>
                                </RadioGroup>
                            </div>
                            {adType === 'image' && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="image-upload" className="text-right">
                                        صورة الإعلان
                                    </Label>
                                    <Input id="image-upload" type="file" className="col-span-3" />
                                </div>
                            )}
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    {adType === 'image' ? 'وصف الإعلان' : 'نص الإعلان'}
                                </Label>
                                <Textarea id="description" placeholder="اكتب المحتوى الإعلاني هنا..." className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    إلغاء
                                </Button>
                            </DialogClose>
                            <Button type="submit">حفظ الإعلان</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                                <TableHead className="hidden sm:table-cell">النوع</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead className="hidden md:table-cell">مكان العرض</TableHead>
                                <TableHead>
                                    <span className="sr-only">الإجراءات</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ads.map((ad) => {
                                const statusInfo = statusMap[ad.status];
                                const typeInfo = typeMap[ad.type];
                                const TypeIcon = typeInfo.icon;
                                return (
                                <TableRow key={ad.id}>
                                    <TableCell className="font-medium">{ad.title}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="flex items-center gap-2">
                                            <TypeIcon className="h-4 w-4 text-muted-foreground" />
                                            {typeInfo.text}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={statusInfo.className}>
                                            {statusInfo.text}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{ad.placement}</TableCell>
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
