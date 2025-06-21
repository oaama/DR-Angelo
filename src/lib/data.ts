import type { Doctor } from './types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    gender: 'Female',
    specialty: 'Cardiology',
    city: 'Metropolis',
    rating: 4.8,
    reviews: 124,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'Dr. Reed is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
  },
  {
    id: '2',
    name: 'Dr. Marcus Thorne',
    gender: 'Male',
    specialty: 'Dermatology',
    city: 'Starling City',
    rating: 4.9,
    reviews: 210,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'Specializing in cosmetic and medical dermatology, Dr. Thorne is a leader in innovative skin care treatments.',
  },
  {
    id: '3',
    name: 'Dr. Lena Hayes',
    gender: 'Female',
    specialty: 'Orthopedics',
    city: 'Gotham',
    rating: 4.7,
    reviews: 98,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'Dr. Hayes focuses on sports medicine and joint replacement, helping patients regain mobility and live pain-free.',
  },
  {
    id: '4',
    name: 'Dr. Julian Cross',
    gender: 'Male',
    specialty: 'Neurology',
    city: 'Central City',
    rating: 4.6,
    reviews: 85,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'Dr. Cross is renowned for his work in neurodegenerative diseases and cutting-edge research in brain health.',
  },
  {
    id: '5',
    name: 'Dr. Sofia Chen',
    gender: 'Female',
    specialty: 'Pediatrics',
    city: 'Metropolis',
    rating: 5.0,
    reviews: 350,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'With a passion for children\'s health, Dr. Chen provides compassionate and comprehensive care for infants to adolescents.',
  },
  {
    id: '6',
    name: 'Dr. Omar Hassan',
    gender: 'Male',
    specialty: 'Cardiology',
    city: 'Gotham',
    rating: 4.7,
    reviews: 150,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'Dr. Hassan is a dedicated cardiologist focusing on preventative care and managing chronic heart conditions.',
  },
  {
    id: '7',
    name: 'Dr. Chloe Bennet',
    gender: 'Female',
    specialty: 'Dermatology',
    city: 'Central City',
    rating: 4.8,
    reviews: 180,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'Dr. Bennet offers a wide range of dermatological services with a focus on patient education and personalized care.',
  },
  {
    id: '8',
    name: 'Dr. Kenji Tanaka',
    gender: 'Male',
    specialty: 'Orthopedics',
    city: 'Starling City',
    rating: 4.9,
    reviews: 132,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'A leading orthopedic surgeon, Dr. Tanaka is known for his expertise in minimally invasive surgical techniques.',
  },
  {
    id: '9',
    name: 'Dr. Isabelle Rossi',
    gender: 'Female',
    specialty: 'Neurology',
    city: 'Gotham',
    rating: 4.5,
    reviews: 77,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'Dr. Rossi specializes in epilepsy and sleep disorders, utilizing the latest diagnostic technologies.',
  },
  {
    id: '10',
    name: 'Dr. Samuel Jones',
    gender: 'Male',
    specialty: 'Pediatrics',
    city: 'Metropolis',
    rating: 4.9,
    reviews: 280,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'Dr. Jones is a beloved pediatrician known for his friendly demeanor and commitment to family-centered care.',
  },
];

export async function getDoctors(filters: {
  specialty?: string;
  city?: string;
  gender?: string;
}): Promise<Doctor[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredDoctors = doctors;

  if (filters.specialty && filters.specialty !== 'all') {
    filteredDoctors = filteredDoctors.filter(
      (doctor) => doctor.specialty === filters.specialty
    );
  }

  if (filters.city && filters.city !== 'all') {
    filteredDoctors = filteredDoctors.filter(
      (doctor) => doctor.city === filters.city
    );
  }

  if (filters.gender && filters.gender !== 'all') {
    filteredDoctors = filteredDoctors.filter(
      (doctor) => doctor.gender === filters.gender
    );
  }

  return filteredDoctors;
}

export async function getUniqueSpecialties(): Promise<string[]> {
  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];
  return specialties.sort();
}

export async function getUniqueCities(): Promise<string[]> {
  const cities = [...new Set(doctors.map((doctor) => doctor.city))];
  return cities.sort();
}
