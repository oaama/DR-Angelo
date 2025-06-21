import Image from "next/image";
import Link from "next/link";
import { Crown, MapPin, Star } from "lucide-react";
import type { Doctor } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
        <Image
          src={doctor.profilePicture}
          alt={`${doctor.name}`}
          width={80}
          height={80}
          className="rounded-full border-2 border-primary/20 object-cover"
        />
        <div className="flex-1">
          <CardTitle className="text-xl font-bold font-headline">
            {doctor.name}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {doctor.specialty}
          </CardDescription>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{doctor.city}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-4 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{doctor.bio}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{doctor.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({doctor.reviews} تقييم)</span>
            </div>
            <div className="flex items-center gap-2">
                {doctor.subscription.tier === 'مميز' && (
                    <Badge variant="secondary" className="flex items-center gap-1 border-yellow-200 bg-yellow-100 text-yellow-800">
                      <Crown className="h-4 w-4 text-yellow-600" />
                      مميز
                    </Badge>
                )}
                <Badge variant={doctor.gender === 'أنثى' ? 'secondary' : 'outline'} className="capitalize">
                    {doctor.gender}
                </Badge>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        <Button asChild className="w-full">
            <Link href={`/doctor/${doctor.id}`}>احجز موعدًا</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
