'use client';

import { useActionState, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, FileScan, Upload, Info } from 'lucide-react';
import { Spinner } from '@/components/icons';
import { useFormStatus } from 'react-dom';
import { analyzePrescriptionAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const initialState = {
    analysis: null,
    message: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Spinner className="me-2" /> : <FileScan className="me-2 h-4 w-4" />}
            {pending ? "جاري التحليل..." : "تحليل الروشتة"}
        </Button>
    );
}

export default function PrescriptionAnalyzerPage() {
    const [state, formAction] = useActionState(analyzePrescriptionAction, initialState);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (state.message) {
            toast({
                variant: 'destructive',
                title: 'خطأ في التحليل',
                description: state.message,
            });
        }
    }, [state.message, toast]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleReset = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // This is a way to reset the action state if needed, by resubmitting with no data
        // For now, we'll just clear the UI
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-8 animate-fade-in-up">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-headline">محلل الروشتات الطبية</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        ارفع صورة روشتة طبية واضحة، وسيقوم الذكاء الاصطناعي بتحليلها لك.
                    </p>
                </div>
                
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        {!state.analysis && (
                             <form action={formAction} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="prescription-image" className="font-semibold text-lg">اختر صورة الروشتة</Label>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="prescription-image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/80">
                                            {imagePreview ? (
                                                <div className="relative w-full h-full">
                                                    <Image src={imagePreview} alt="معاينة الروشتة" fill style={{ objectFit: 'contain' }} />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت الصورة</p>
                                                    <p className="text-xs text-muted-foreground">PNG, JPG, JPEG (بحد أقصى 5 ميجا)</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                    <Input id="prescription-image" name="prescriptionImage" type="file" className="sr-only" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} ref={fileInputRef} required />
                                </div>
                                {imagePreview && <SubmitButton />}
                            </form>
                        )}
                       

                        {state.analysis && (
                            <div className="space-y-6">
                                <Alert variant="default" className="bg-green-100/50 border-green-200">
                                    <AlertCircle className="h-4 w-4 text-green-700" />
                                    <AlertTitle className="font-bold text-green-800">تم تحليل الروشتة بنجاح</AlertTitle>
                                </Alert>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>الأدوية الموصوفة</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>الدواء</TableHead>
                                                    <TableHead>الجرعة</TableHead>
                                                    <TableHead>التكرار</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {state.analysis.medications.map((med, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">{med.name || 'غير محدد'}</TableCell>
                                                        <TableCell>{med.dosage || 'غير محدد'}</TableCell>
                                                        <TableCell>{med.frequency || 'غير محدد'}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2"><Info className="w-5 h-5"/> ملاحظات الطبيب</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{state.analysis.notes || 'لا توجد ملاحظات إضافية.'}</p>
                                    </CardContent>
                                </Card>
                                
                                <Button onClick={() => window.location.reload()} className="w-full">تحليل روشتة أخرى</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div className="text-center">
                    <Button variant="link" asChild>
                        <Link href="/">العودة إلى الصفحة الرئيسية</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
