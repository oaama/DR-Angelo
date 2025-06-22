import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, UserCog, FileBadge2, Phone, Building, Stethoscope, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUniqueCities, getUniqueSpecialties } from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateDoctorProfileAction, requestVerificationAction } from "@/app/actions";
import { ProfileAvatar } from "@/components/profile-avatar";


export default async function ProfilePage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/login');
    }

    const isDoctor = currentUser.userType === 'doctor';
    // Fetch lists only if the user is a doctor
    const [cities, specialties] = isDoctor ? await Promise.all([
        getUniqueCities(),
        getUniqueSpecialties()
    ]) : [[], []];

    const statusMap = {
        pending: { text: "قيد المراجعة", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
        verified: { text: "تم التحقق", className: "bg-green-100 text-green-800 border-green-200" },
        rejected: { text: "مرفوض", className: "bg-red-100 text-red-800 border-red-200" },
        unverified: { text: 'لم يتم التحقق', className: 'bg-gray-100 text-gray-800 border-gray-200' },
    };
    const statusInfo = statusMap[currentUser.verificationStatus] || statusMap.unverified;
    const isVerificationLocked = currentUser.verificationStatus === 'pending' || currentUser.verificationStatus === 'verified';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8 animate-fade-in-up" style={{ animationFillMode: 'backwards' }}>
        <div className="flex items-center gap-6">
          <ProfileAvatar user={currentUser} />
          <div>
            <h1 className="text-3xl font-bold font-headline">{currentUser.name}</h1>
            <p className="text-muted-foreground capitalize">{currentUser.userType}</p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <UserCog className="h-6 w-6 text-primary" />
              تعديل الملف الشخصي
            </CardTitle>
            <CardDescription>
              يمكنك تحديث معلوماتك الشخصية من هنا. سيتم حفظ التغييرات عند الضغط على الزر.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateDoctorProfileAction} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل</Label>
                <Input id="fullName" name="fullName" defaultValue={currentUser.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" name="email" type="email" defaultValue={currentUser.email} required />
              </div>

              {isDoctor && (
                <>
                   <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4"/> رقم الهاتف</Label>
                      <Input id="phone" name="phone" type="tel" defaultValue={currentUser.phone} required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="city" className="flex items-center gap-2"><Building className="w-4 h-4"/> المدينة</Label>
                        <Select name="city" defaultValue={currentUser.city} required>
                            <SelectTrigger id="city"><SelectValue placeholder="اختر المدينة" /></SelectTrigger>
                            <SelectContent>
                                {cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="specialty" className="flex items-center gap-2"><Stethoscope className="w-4 h-4"/> التخصص</Label>
                        <Select name="specialty" defaultValue={currentUser.specialty} required>
                            <SelectTrigger id="specialty"><SelectValue placeholder="اختر التخصص" /></SelectTrigger>
                            <SelectContent>
                                {specialties.map(spec => <SelectItem key={spec} value={spec}>{spec}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio" className="flex items-center gap-2"><FileText className="w-4 h-4"/> السيرة الذاتية</Label>
                      <Textarea id="bio" name="bio" placeholder="اكتب نبذة عن خبراتك وإنجازاتك المهنية..." rows={5} defaultValue={currentUser.bio} required />
                    </div>
                </>
              )}

              <div className="md:col-span-2 flex justify-end">
                <Button type="submit">حفظ التغييرات</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isDoctor && (
          <>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <FileBadge2 className="h-6 w-6 text-primary" />
                        توثيق الحساب المهني
                    </CardTitle>
                    <CardDescription>
                        يرجى رفع صورة واضحة من كارنيه النقابة لتوثيق حسابك كطبيب معتمد.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={requestVerificationAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="id-card-upload">صورة الكارنيه</Label>
                            <Input id="id-card-upload" name="id-card-upload" type="file" disabled={isVerificationLocked} required />
                        </div>
                         <div className="text-sm text-muted-foreground">الحالة الحالية: <Badge variant="outline" className={statusInfo.className}>{statusInfo.text}</Badge></div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isVerificationLocked}>
                                {currentUser.verificationStatus === 'rejected' ? "إعادة رفع المستند" : "رفع المستند لتوثيقه"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

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
          </>
        )}
      </div>
    </div>
  );
}
