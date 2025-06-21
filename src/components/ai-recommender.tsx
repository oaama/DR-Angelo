"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { recommendDoctorAction } from "@/app/actions";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Lightbulb } from "lucide-react";
import { DoctorCard } from "./doctor-card";
import { Spinner } from "./icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";


const initialState = {
    doctors: null,
    message: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Spinner className="mr-2" /> : <Lightbulb className="mr-2 h-4 w-4" />}
            {pending ? "Analyzing..." : "Get Recommendation"}
        </Button>
    )
}

export function AIRecommender() {
    const [state, formAction] = useFormState(recommendDoctorAction, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
    }, [state.message, toast]);

    const handleFormAction = (formData: FormData) => {
        formAction(formData);
        if(!state.message){
             formRef.current?.reset();
        }
    };

    return (
        <Card className="sticky top-20 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    AI Doctor Match
                </CardTitle>
                <CardDescription>
                    Describe your medical issue, and our AI will recommend a specialist for you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleFormAction} ref={formRef} className="space-y-4">
                    <Textarea
                        name="description"
                        placeholder="e.g., 'I have a persistent cough and chest pain...'"
                        rows={4}
                        required
                        minLength={10}
                    />
                    <SubmitButton />
                </form>

                {state.doctors && (
                    <div className="mt-6 space-y-4">
                        <h3 className="font-bold text-lg">Our Recommendations:</h3>
                        {state.doctors.length > 0 ? (
                           <div className="space-y-4">
                             {state.doctors.map(doctor => (
                               <DoctorCard key={doctor.id} doctor={doctor} />
                             ))}
                           </div>
                        ) : (
                            <Alert variant="default" className="bg-primary/10">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>No Matches Found</AlertTitle>
                                <AlertDescription>
                                    Our AI couldn't find a suitable doctor in our database based on your description. Please try refining your search or browse our specialists manually.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
