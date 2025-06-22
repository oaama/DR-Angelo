
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
  email: string;
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
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'unverified';
  idCardImage?: string; // URL to the uploaded ID card
  submissionDate?: string; // Date of ID submission
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  userType: 'patient';
}
