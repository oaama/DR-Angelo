"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { recommendDoctorAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Lightbulb, Info } from "lucide-react";
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
            {pending ? <Spinner className="me-2" /> : <Lightbulb className="me-2 h-4 w-4" />}
            {pending ? "جاري التحليل..." : "احصل على ترشيح"}
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
        <Card className="sticky top-20 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    ترشيح الطبيب بالذكاء الاصطناعي
                </CardTitle>
                <CardDescription>
                    صف مشكلتك الطبية، وسيقوم الذكاء الاصطناعي بترشيح أخصائي لك وتقديم نصيحة أولية.
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
                        <AlertTitle className="font-bold">نصيحة أولية</AlertTitle>
                        <AlertDescription>
                            <p>{state.advice}</p>
                            <p className="text-xs mt-2 text-muted-foreground">تنبيه: هذه النصيحة لا تغني عن استشارة الطبيب المختص.</p>
                        </AlertDescription>
                    </Alert>
                )}

                {state.doctors && (
                    <div className="mt-6 space-y-4">
                        <h3 className="font-bold text-lg">ترشيحاتنا لك:</h3>
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
                                    لم يتمكن الذكاء الاصطناعي من العثور على طبيب مناسب في قاعدة بياناتنا بناءً على وصفك. يرجى محاولة تحسين بحثك أو تصفح المتخصصين لدينا يدويًا.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
