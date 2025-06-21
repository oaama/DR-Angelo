import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail, User, UserCog } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src="/avatars/01.png" alt="صورة المستخدم" />
            <AvatarFallback>سع</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">سارة علي</h1>
            <p className="text-muted-foreground">مريض</p>
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
                <Input id="fullName" defaultValue="سارة علي" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني
                </Label>
                <Input id="email" type="email" defaultValue="sara@example.com" />
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
      </div>
    </div>
  );
}
