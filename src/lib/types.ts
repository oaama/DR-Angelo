export interface Doctor {
  id: string;
  name: string;
  gender: 'ذكر' | 'أنثى';
  specialty: string;
  city: string;
  rating: number;
  reviews: number;
  profilePicture: string;
  bio: string;
}
