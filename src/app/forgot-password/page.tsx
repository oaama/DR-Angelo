'use client';

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck, KeyRound, Spinner } from "lucide-react";
import { forgotPasswordAction } from "@/app/actions";

const initialState = {
  message: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Spinner className="me-2" /> : <MailCheck className="me-2 h-4 w-4" />}
      إرسال رابط إعادة التعيين
    </Button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(forgotPasswordAction, initialState);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-12 px-4">
      <Card className="mx-auto max-w-sm w-full animate-fade-in-up" style={{ animationFillMode: 'backwards' }}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <KeyRound className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">هل نسيت كلمة المرور؟</CardTitle>
          <CardDescription>
            لا تقلق. أدخل بريدك الإلكتروني أدناه وسنرسل لك رابطًا لإعادة تعيين كلمة المرور الخاصة بك.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.success ? (
            <Alert variant="default" className="bg-green-100/50 border-green-200">
                <MailCheck className="h-4 w-4 text-green-700" />
                <AlertTitle className="font-bold text-green-800">تم إرسال الطلب بنجاح</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          ) : (
            <form action={formAction} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {state.message && !state.success && (
                <p className="text-sm font-medium text-destructive">{state.message}</p>
              )}
              <SubmitButton />
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            تذكرت كلمة المرور؟{" "}
            <Link href="/login" className="underline">
              العودة لتسجيل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
