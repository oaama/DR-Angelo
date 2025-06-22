'use client';

import Link from "next/link"
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from 'react-dom';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { googleLoginAction, signupAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

function GoogleSignupButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="outline" className="w-full" type="submit" disabled={pending}>
      {pending ? <Spinner className="me-2" /> : <GoogleIcon className="me-2 h-4 w-4" />}
      إنشاء حساب باستخدام جوجل
    </Button>
  )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Spinner className="me-2" /> : null}
            إنشاء حساب
        </Button>
    );
}

export default function SignupPage() {
  const [userType, setUserType] = useState('patient');
  const { toast } = useToast();
  const [state, formAction] = useActionState(signupAction, { message: null });

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: 'destructive',
        title: 'خطأ في إنشاء الحساب',
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
          <CardTitle className="text-2xl font-headline">إنشاء حساب في طبيبك</CardTitle>
          <CardDescription>
            أدخل معلوماتك لإنشاء حساب
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form action={formAction} className="grid gap-4">
              <div className="grid gap-2">
                <Label>أنت تسجل كـ</Label>
                <RadioGroup defaultValue="patient" name="userType" className="grid grid-cols-2 gap-4" onValueChange={setUserType}>
                  <Label
                    htmlFor="patient"
                    className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="patient" id="patient" className="sr-only" />
                    مريض
                  </Label>
                  <Label
                    htmlFor="doctor"
                    className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="doctor" id="doctor" className="sr-only" />
                    دكتور
                  </Label>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">الاسم الأول</Label>
                  <Input id="firstName" name="firstName" placeholder="أحمد" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">الاسم الأخير</Label>
                  <Input id="lastName" name="lastName" placeholder="محمود" required />
                </div>
              </div>
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

              {userType === 'doctor' && (
                <div className="grid gap-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="01234567890" required />
                </div>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" name="password" type="password" required/>
              </div>
              <SubmitButton />
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
                <GoogleSignupButton />
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="underline">
              تسجيل الدخول
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
