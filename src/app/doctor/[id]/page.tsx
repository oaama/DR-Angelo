import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDoctorById } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, ClockIcon, MapPin, MessageSquare, Star, UserCircle, Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as React from 'react';

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

  const appointmentTimes = [
    "09:00 ص", "09:30 ص", "10:00 ص", "10:30 ص",
    "02:00 م", "02:30 م", "03:00 م", "03:30 م"
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column - Doctor Info */}
        <div className="lg:col-span-1 animate-fade-in-up" style={{ animationFillMode: 'backwards', animationDelay: '0.2s'}}>
          <Card className="overflow-hidden shadow-lg sticky top-24">
            <CardContent className="p-6 text-center">
              <Image
                src={doctor.profilePicture}
                alt={`صورة ${doctor.name}`}
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
          
          {/* Reviews Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  التقييمات والتعليقات
              </CardTitle>
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
              <CardTitle className="font-headline text-xl">أضف تقييمك</CardTitle>
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
  );
}
