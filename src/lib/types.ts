export interface Doctor {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  specialty: string;
  city: string;
  rating: number;
  reviews: number;
  profilePicture: string;
  bio: string;
}
