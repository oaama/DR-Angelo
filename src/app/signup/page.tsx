'use client';

import Link from "next/link"
import { useState } from "react";
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
import { StethoscopeIcon } from "@/components/icons"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignupPage() {
  const [userType, setUserType] = useState('patient');

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
          <form className="grid gap-4">
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
                <Label htmlFor="first-name">الاسم الأول</Label>
                <Input id="first-name" placeholder="أحمد" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">الاسم الأخير</Label>
                <Input id="last-name" placeholder="محمود" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {userType === 'doctor' && (
              <div className="grid gap-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" type="tel" placeholder="01234567890" required />
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" required/>
            </div>
            <Button type="submit" className="w-full">
              إنشاء حساب
            </Button>
            <Button variant="outline" className="w-full">
              إنشاء حساب باستخدام جوجل
            </Button>
          </form>
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
