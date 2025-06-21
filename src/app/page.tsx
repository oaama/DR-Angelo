import { DoctorSearchForm } from '@/components/doctor-search-form';
import { DoctorCard } from '@/components/doctor-card';
import { AIRecommender } from '@/components/ai-recommender';
import { getDoctors, getUniqueCities, getUniqueSpecialties } from '@/lib/data';
import Image from 'next/image';

// This is a temporary simulation of a logged-in user.
// In a real application, you would get this from a session or context.
const getCurrentUser = async () => {
    return {
        name: 'سارة علي',
        email: 'sara.ali@example.com',
        userType: 'patient' as const,
        gender: 'أنثى' as const,
        avatar: 'https://placehold.co/200x200.png'
    }
}


export default async function Home({
  searchParams,
}: {
  searchParams: { specialty?: string; city?: string; gender?: string };
}) {
  const currentUser = await getCurrentUser();
  // For a patient user, we can pass their gender for potential sorting preferences.
  const userGenderForSorting = currentUser.userType === 'patient' ? currentUser.gender : undefined;

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

  return (
    <>
      <section className="relative w-full border-b min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="https://placehold.co/1600x900.png"
            alt="خلفية طبية لفريق من الأطباء"
            data-ai-hint="doctors team"
            fill
            className="object-cover object-center animate-hero-zoom"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
          <div className="mx-auto grid max-w-4xl items-start gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-headline">
                ابحث عن طبيبك المثالي
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/90">
                ابحث في شبكة المتخصصين لدينا للعثور على الرعاية التي تحتاجها.
              </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
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
                  ? `يتم عرض ${doctors.length} من الأطباء`
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
            <aside className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
              <AIRecommender />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
