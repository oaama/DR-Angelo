import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, KeyRound, Mail, User, UserCog } from "lucide-react";

// This is a temporary simulation of a logged-in user.
// In a real application, you would get this from a session or context.
const currentUser = {
  name: 'سارة علي',
  email: 'sara.ali@example.com',
  userType: 'patient' as const,
  gender: 'أنثى' as const,
  avatar: 'https://placehold.co/200x200.png'
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8 animate-fade-in-up" style={{ animationFillMode: 'backwards' }}>
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={currentUser.avatar} alt={`صورة ${currentUser.name}`} />
            <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">{currentUser.name}</h1>
            <p className="text-muted-foreground">{currentUser.userType === 'doctor' ? 'طبيب' : 'مريض'}</p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <UserCog className="h-6 w-6 text-primary" />
              تعديل الملف الشخصي
            </CardTitle>
            <CardDescription>
              يمكنك تحديث معلوماتك الشخصية من هنا.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  الاسم الكامل
                </Label>
                <Input id="fullName" defaultValue={currentUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني
                </Label>
                <Input id="email" type="email" defaultValue={currentUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  كلمة المرور الحالية
                </Label>
                <Input id="currentPassword" type="password" placeholder="اتركها فارغة لعدم التغيير" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  كلمة المرور الجديدة
                </Label>
                <Input id="newPassword" type="password" placeholder="اتركها فارغة لعدم التغيير" />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit">حفظ التغييرات</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Subscription card is only shown for doctors */}
        {currentUser.userType === 'doctor' && (
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <Crown className="h-6 w-6 text-primary" />
                        إدارة الاشتراك
                    </CardTitle>
                    <CardDescription>
                        قم بترقية باقتك للوصول إلى ميزات حصرية وزيادة ظهورك للمرضى.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                        <div>
                            <p className="font-semibold">باقتك الحالية: <span className="text-primary font-bold">{'مميز'}</span></p>
                            <p className="text-sm text-muted-foreground">تاريخ التجديد: {'2025-01-01'}</p>
                        </div>
                        <Button asChild>
                            <Link href="/profile/subscription">
                                عرض كل الباقات
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
