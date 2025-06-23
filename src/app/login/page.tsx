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
import { GoogleIcon, StethoscopeIcon, Spinner } from "@/components/icons"
import { loginAction, googleLoginAction } from "@/app/actions";
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

function GoogleLoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="outline" className="w-full" type="submit" disabled={pending}>
      {pending ? <Spinner className="me-2" /> : <GoogleIcon className="me-2 h-4 w-4" />}
      تسجيل الدخول باستخدام جوجل
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
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form action={formAction}>
              <div className="grid gap-4">
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
                    <Link href="/forgot-password" className="ms-auto inline-block text-sm underline">
                      هل نسيت كلمة المرور؟
                    </Link>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                <SubmitButton />
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  أو استمر بـ
                </span>
              </div>
            </div>
            <form action={googleLoginAction}>
              <GoogleLoginButton />
            </form>
          </div>
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
