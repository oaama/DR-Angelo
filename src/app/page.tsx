
import { DoctorSearchForm } from '@/components/doctor-search-form';
import { DoctorCard } from '@/components/doctor-card';
import { AIRecommender } from '@/components/ai-recommender';
import { getDoctors, getUniqueCities, getUniqueSpecialties, getActiveAds } from '@/lib/data';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine, PackageSearch } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AdCard } from '@/components/ad-card';


export default async function Home({
  searchParams,
}: {
  searchParams: { specialty?: string; city?: string; gender?: string };
}) {
  const currentUser = await getCurrentUser();
  // For a patient user, we can pass their gender for potential sorting preferences.
  const userGenderForSorting = currentUser?.userType === 'patient' ? currentUser.gender : undefined;

  const specialty = searchParams.specialty;
  const city = searchParams.city;
  const gender = searchParams.gender;
  
  const doctors = await getDoctors({
    specialty,
    city,
    gender,
  }, userGenderForSorting);
  
  const cities = await getUniqueCities();
  const specialties = await getUniqueSpecialties();
  const homepageAds = await getActiveAds('homepage-sidebar');
  const mainAd = homepageAds.length > 0 ? homepageAds[0] : null;

  return (
    <>
      <section className="w-full border-b bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 lg:py-32">
          <div className="mx-auto grid max-w-3xl items-center justify-center text-center gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
                ابحث عن طبيبك المثالي
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                ابحث في شبكة المتخصصين لدينا للعثور على الرعاية التي تحتاجها.
              </p>
            </div>
            <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
              <DoctorSearchForm specialties={specialties} cities={cities} />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
              <h2 className="text-3xl font-bold tracking-tight font-headline">
                {doctors.length > 0
                  ? `يتم عرض ${doctors.length} من الأطباء الموثوقين`
                  : 'لا يوجد أطباء يطابقون بحثك'}
              </h2>
              {doctors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
                  <div className="text-lg font-medium">
                    لم يتم العثور على نتائج
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    يرجى المحاولة مرة أخرى أو تعديل فلاتر البحث.
                  </p>
                </div>
              )}
            </div>
            <aside className="lg:col-span-1">
              <div className="sticky top-20 space-y-8 animate-fade-in-up" style={{ animationFillMode: 'backwards', animationDelay: '0.7s' }}>
                <AIRecommender />
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline text-xl">
                            <ScanLine className="h-6 w-6 text-primary" />
                            مفسّر الروشتات
                        </CardTitle>
                        <CardDescription>
                            لتجنب أي التباس، قم بتحميل صورة الروشتة. سيقوم نظامنا الذكي بتحليلها وتوضيح أسماء الأدوية والجرعات بدقة.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/prescription-analyzer">
                                جرب الآن
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline text-xl">
                            <PackageSearch className="h-6 w-6 text-primary" />
                            البحث عن دواء ناقص
                        </CardTitle>
                        <CardDescription>
                            هل تبحث عن دواء غير متوفر؟ أخبرنا وسنساعدك في محاولة إيجاده.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/find-medication">
                                ابحث عن دوائك
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                {mainAd && <AdCard ad={mainAd} />}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
