import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDoctorById } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, ClockIcon, MapPin, Star } from 'lucide-react';

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = await getDoctorById(params.id);

  if (!doctor) {
    notFound();
  }

  const appointmentTimes = [
    "09:00 ص", "09:30 ص", "10:00 ص", "10:30 ص",
    "02:00 م", "02:30 م", "03:00 م", "03:30 م"
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Left Column - Doctor Info */}
        <div className="md:col-span-1">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-6 text-center">
              <Image
                src={doctor.profilePicture}
                alt={`صورة ${doctor.name}`}
                width={160}
                height={160}
                className="mx-auto mb-4 rounded-full border-4 border-primary/30 object-cover"
                data-ai-hint="doctor portrait"
              />
              <h1 className="text-2xl font-bold font-headline">{doctor.name}</h1>
              <p className="text-lg text-primary">{doctor.specialty}</p>
              <div className="mt-2 flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{doctor.city}</span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{doctor.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({doctor.reviews} تقييم)</span>
              </div>
               <Badge variant={doctor.gender === 'أنثى' ? 'secondary' : 'outline'} className="capitalize mt-4">
                {doctor.gender}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details & Booking */}
        <div className="md:col-span-2 space-y-8">
          {/* About Doctor */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">عن الطبيب</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {doctor.bio}
              </p>
            </CardContent>
          </Card>

          {/* Booking Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-primary" />
                احجز موعدك
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold">المواعيد المتاحة اليوم:</h3>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {appointmentTimes.map(time => (
                    <Button key={time} variant="outline" className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
                <Button className="w-full mt-4" size="lg">
                  تأكيد الحجز
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  ستحتاج إلى تسجيل الدخول لتأكيد حجزك.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
