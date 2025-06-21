'use client';

import Link from "next/link"
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StethoscopeIcon, Spinner } from "@/components/icons"
import { loginAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Spinner className="me-2" />}
            تسجيل الدخول
        </Button>
    )
}

export default function LoginPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(loginAction, { message: null });

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: 'destructive',
        title: 'خطأ في تسجيل الدخول',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-12 px-4">
      <Card className="mx-auto max-w-sm w-full animate-fade-in-up" style={{ animationFillMode: 'backwards' }}>
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <StethoscopeIcon className="w-10 h-10 text-primary"/>
            </div>
          <CardTitle className="text-2xl font-headline">تسجيل الدخول إلى طبيبك</CardTitle>
          <CardDescription>
            أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك.
            <br />
            <span className="text-xs">(للإدارة: admin@tabeebk.com / password123)</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-4">
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">كلمة المرور</Label>
                <Link href="#" className="ms-auto inline-block text-sm underline">
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <SubmitButton />
            <Button variant="outline" className="w-full" type="button">
              تسجيل الدخول باستخدام جوجل
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ليس لديك حساب؟{" "}
            <Link href="/signup" className="underline">
              إنشاء حساب
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
