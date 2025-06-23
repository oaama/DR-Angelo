'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PackageSearch, CircleHelp, MessageSquareReply, ArrowLeft } from 'lucide-react';
import { Spinner } from '@/components/icons';
import { useFormStatus } from 'react-dom';
import { findMedicationAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const initialState = {
    response: null,
    message: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {pending ? <Spinner className="me-2" /> : <PackageSearch className="me-2 h-4 w-4" />}
            {pending ? "جاري البحث..." : "إرسال الطلب"}
        </Button>
    );
}

export default function FindMedicationPage() {
    const [state, formAction] = useActionState(findMedicationAction, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.message) {
            toast({
                variant: 'destructive',
                title: 'خطأ',
                description: state.message,
            });
        }
    }, [state.message, toast]);

    return (
        <div className="container mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-8 animate-fade-in-up">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <PackageSearch className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold font-headline">البحث عن دواء ناقص</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        لم تجد دوائك في الصيدليات؟ أخبرنا باسمه وسنحاول المساعدة في توفيره.
                    </p>
                </div>
                
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        {!state.response ? (
                             <form action={formAction} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="medicationName" className="font-semibold text-lg flex items-center gap-2">
                                        <CircleHelp className="w-5 h-5 text-primary" />
                                        ما هو اسم الدواء الذي تبحث عنه؟
                                    </Label>
                                    <Input 
                                        id="medicationName" 
                                        name="medicationName" 
                                        type="text" 
                                        placeholder="مثال: كونجستال، اوجمنتين..." 
                                        required 
                                        className="h-12 text-base"
                                    />
                                </div>
                                <SubmitButton />
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <Alert variant="default" className="bg-green-100/50 border-green-200">
                                    <AlertTitle className="font-bold text-green-800">تم استلام طلبك بنجاح</AlertTitle>
                                </Alert>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MessageSquareReply className="w-5 h-5 text-primary"/> 
                                            رسالة من مساعدك الصيدلي
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{state.response}</p>
                                    </CardContent>
                                </Card>
                                
                                <Button onClick={() => window.location.reload()} className="w-full">
                                    الإبلاغ عن دواء آخر
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div className="text-center">
                    <Button variant="link" asChild>
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            العودة إلى الصفحة الرئيسية
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
