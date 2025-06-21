import { DoctorSearchForm } from '@/components/doctor-search-form';
import { DoctorCard } from '@/components/doctor-card';
import { AIRecommender } from '@/components/ai-recommender';
import { getDoctors, getUniqueCities, getUniqueSpecialties } from '@/lib/data';

export default async function Home({
  searchParams,
}: {
  searchParams: { specialty?: string; city?: string; gender?: string };
}) {
  const doctors = await getDoctors(searchParams);
  const cities = await getUniqueCities();
  const specialties = await getUniqueSpecialties();

  return (
    <>
      <section className="w-full border-b">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
          <div className="mx-auto grid max-w-4xl items-start gap-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
                Find Your Perfect Doctor
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Search our network of specialists to find the care you need.
              </p>
            </div>
            <DoctorSearchForm specialties={specialties} cities={cities} />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-bold tracking-tight font-headline">
                {doctors.length > 0
                  ? `Showing ${doctors.length} Doctors`
                  : 'No doctors match your search'}
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
                    No results found
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search filters to find more doctors.
                  </p>
                </div>
              )}
            </div>
            <aside className="space-y-8">
              <AIRecommender />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
