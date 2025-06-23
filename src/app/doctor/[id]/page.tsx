import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDoctorById } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CalendarIcon, Phone, MapPin, MessageSquare, Star, UserCircle, Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as React from 'react';
import type { Metadata } from 'next';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const doctor = await getDoctorById(params.id);

  if (!doctor) {
    return {
      title: 'الطبيب غير موجود',
      description: 'لم نتمكن من العثور على صفحة الطبيب المطلوبة. قد يكون الرابط غير صحيح أو تم حذف الصفحة.',
    };
  }
  
  const title = `د. ${doctor.name} - ${doctor.specialty} في ${doctor.city}`;
  const description = `احجز موعدًا مع د. ${doctor.name}, ${doctor.specialty} متخصص في ${doctor.bio.substring(0, 120)}... تقييمات، معلومات الاتصال، والمزيد.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      profile: {
        firstName: doctor.name.split(' ')[1],
        lastName: doctor.name.split(' ')[2] || '',
        username: `dr-${doctor.id}`,
        gender: doctor.gender === 'ذكر' ? 'male' : 'female',
      },
      images: [
        {
          url: doctor.profilePicture,
          width: 200,
          height: 200,
          alt: `صورة ${doctor.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [doctor.profilePicture],
    },
  };
}


function StarRating({ rating, className }: { rating: number, className?: string }) {
  const totalStars = 5;
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < Math.round(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-muted-foreground/20 text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = await getDoctorById(params.id);

  if (!doctor) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doctor.name,
    "image": doctor.profilePicture,
    "description": doctor.bio,
    "medicalSpecialty": doctor.specialty,
    "address": {
        "@type": "PostalAddress",
        "addressLocality": doctor.city,
        "addressCountry": "EG"
    },
    "telephone": doctor.phone,
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": doctor.rating.toFixed(1),
        "reviewCount": doctor.reviews
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationFillMode: 'backwards', animationDelay: '0.2s'}}>
            <Card className="overflow-hidden shadow-lg sticky top-24">
              <CardContent className="p-6 text-center">
                <Image
                  src={doctor.profilePicture}
                  alt={`صورة ${doctor.name}`}
                  data-ai-hint="profile picture"
                  width={160}
                  height={160}
                  className="mx-auto mb-4 rounded-full border-4 border-primary/30 object-cover"
                />
                <h1 className="text-2xl font-bold font-headline flex items-center gap-2 justify-center">
                  {doctor.name}
                  {doctor.subscription.tier === 'مميز' && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Crown className="h-6 w-6 text-yellow-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>طبيب مميز</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </h1>
                <p className="text-lg text-primary">{doctor.specialty}</p>
                <div className="mt-2 flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{doctor.city}</span>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <StarRating rating={doctor.rating} />
                  <span className="font-bold">{doctor.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({doctor.reviews} تقييم)</span>
                </div>
                <Badge variant={doctor.gender === 'أنثى' ? 'secondary' : 'outline'} className="capitalize mt-4">
                  {doctor.gender}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details, Booking & Reviews */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationFillMode: 'backwards', animationDelay: '0.4s'}}>
            {/* About Doctor */}
            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="font-headline text-xl font-semibold leading-none tracking-tight">عن الطبيب</h2>
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
                <h2 className="font-headline text-xl flex items-center gap-2 font-semibold leading-none tracking-tight">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                  احجز موعدك
                </h2>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    لتأكيد الحجز، يرجى الاتصال مباشرة برقم الطبيب.
                  </p>
                  <Button asChild className="w-full" size="lg">
                    <a href={`tel:${doctor.phone}`}>
                      <Phone className="h-5 w-5 me-2" />
                      اتصل الآن للحجز ({doctor.phone})
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Reviews Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="font-headline text-xl flex items-center gap-2 font-semibold leading-none tracking-tight">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    التقييمات والتعليقات
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {doctor.comments && doctor.comments.length > 0 ? (
                  doctor.comments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                      <div className="flex gap-4">
                        <UserCircle className="h-10 w-10 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{comment.patientName}</h4>
                            <span className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString('ar-EG')}</span>
                          </div>
                          <StarRating rating={comment.rating} className="my-1" />
                          <p className="text-sm text-muted-foreground">{comment.text}</p>
                        </div>
                      </div>
                      {index < doctor.comments!.length - 1 && <Separator />}
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">لا توجد تقييمات لهذا الطبيب حتى الآن.</p>
                )}
              </CardContent>
            </Card>
            
            {/* Add Review Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="font-headline text-xl font-semibold leading-none tracking-tight">أضف تقييمك</h2>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="font-semibold mb-2 block">تقييمك</label>
                    <div className="flex flex-row-reverse justify-end gap-1">
                      {[5,4,3,2,1].map((star) => (
                        <React.Fragment key={star}>
                          <input type="radio" id={`star${star}`} name="rating" value={star} className="peer sr-only" />
                          <label htmlFor={`star${star}`} className="cursor-pointer peer-hover:text-yellow-400 peer-checked:text-yellow-400 text-muted-foreground/30">
                            <Star className="h-7 w-7" />
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comment" className="font-semibold mb-2 block">تعليقك</label>
                    <Textarea id="comment" name="comment" placeholder="اكتب تعليقك هنا..." rows={4} />
                  </div>
                  <Button type="submit" className="w-full">إرسال التقييم</Button>
                  <p className="text-center text-xs text-muted-foreground">
                    يجب أن تكون مسجلاً للدخول لإضافة تقييم.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
