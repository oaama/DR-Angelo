
export interface Comment {
  id: string;
  patientName: string;
  rating: number;
  text: string;
  date: string;
}

export interface Doctor {
  id: string;
  name: string;
  gender: 'ذكر' | 'أنثى';
  specialty: string;
  city: string;
  phone: string;
  rating: number;
  reviews: number;
  profilePicture: string;
  bio: string;
  subscription: {
    tier: 'أساسي' | 'مميز' | 'احترافي';
    status: 'نشط' | 'منتهي';
  };
  comments?: Comment[];
}
