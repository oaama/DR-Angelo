"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { recommendDoctorAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Compass, Info } from "lucide-react";
import { DoctorCard } from "./doctor-card";
import { Spinner } from "./icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";


const initialState = {
    doctors: null,
    message: null,
    advice: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Spinner className="me-2" /> : <Compass className="me-2 h-4 w-4" />}
            {pending ? "جاري التحليل..." : "اسأل مرشدك الطبي"}
        </Button>
    )
}

export function AIRecommender() {
    const [state, formAction] = useActionState(recommendDoctorAction, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message) {
            toast({
                variant: 'destructive',
                title: 'خطأ',
                description: state.message,
            });
        } else if (state.doctors && state.doctors.length > 0) {
            // Reset the form on success
            formRef.current?.reset();
        }
    }, [state, toast]);

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Compass className="h-6 w-6 text-primary" />
                    مرشدك الطبي الذكي
                </CardTitle>
                <CardDescription>
                    صف مشكلتك الطبية، وسيقوم مرشدك الذكي بتحليل حالتك وترشيح أفضل الأطباء لك.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} ref={formRef} className="space-y-4">
                    <Textarea
                        name="description"
                        placeholder="مثال: 'أعاني من سعال مستمر وألم في الصدر...'"
                        rows={4}
                        required
                        minLength={10}
                    />
                    <SubmitButton />
                </form>

                {state.advice && (
                    <Alert variant="default" className="mt-6 bg-primary/10 border-primary/20">
                        <Info className="h-4 w-4 text-primary" />
                        <AlertTitle className="font-bold">نصيحة من مرشدك</AlertTitle>
                        <AlertDescription>
                            <p>{state.advice}</p>
                            <p className="text-xs mt-2 text-muted-foreground">تنبيه: هذه النصيحة لا تغني عن استشارة الطبيب المختص.</p>
                        </AlertDescription>
                    </Alert>
                )}

                {state.doctors && (
                    <div className="mt-6 space-y-4">
                        <h3 className="font-bold text-lg">ترشيحات مرشدك لك:</h3>
                        {state.doctors.length > 0 ? (
                           <div className="space-y-4">
                             {state.doctors.map(doctor => (
                               <DoctorCard key={doctor.id} doctor={doctor} />
                             ))}
                           </div>
                        ) : (
                            <Alert variant="default" className="bg-primary/10">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>لم يتم العثور على نتائج مطابقة</AlertTitle>
                                <AlertDescription>
                                    لم يتمكن مرشدك الذكي من العثور على طبيب مناسب في قاعدة بياناتنا بناءً على وصفك. يرجى محاولة تحسين بحثك أو تصفح المتخصصين لدينا يدويًا.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
