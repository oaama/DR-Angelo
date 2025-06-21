"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";

interface DoctorSearchFormProps {
  specialties: string[];
  cities: string[];
}

export function DoctorSearchForm({
  specialties,
  cities,
}: DoctorSearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const specialty = formData.get("specialty") as string;
    const city = formData.get("city") as string;
    const gender = formData.get("gender") as string;

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (specialty) current.set("specialty", specialty);
    else current.delete("specialty");
    
    if (city) current.set("city", city);
    else current.delete("city");

    if (gender) current.set("gender", gender);
    else current.delete("gender");
    
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <Card className="mt-8 shadow-lg">
      <CardContent className="p-4 md:p-6">
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          onSubmit={handleSearch}
        >
          <Select name="specialty" defaultValue={searchParams.get('specialty') || 'all'}>
            <SelectTrigger>
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="city" defaultValue={searchParams.get('city') || 'all'}>
            <SelectTrigger>
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="gender" defaultValue={searchParams.get('gender') || 'all'}>
            <SelectTrigger>
              <SelectValue placeholder="Any Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Gender</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Search Doctors
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
