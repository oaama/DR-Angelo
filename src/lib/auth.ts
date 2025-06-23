
'use server';

import { cookies } from 'next/headers';
import { doctors, patients } from './data';
import type { Doctor } from './types';

// This is the unified User type used throughout the app for the current session user.
export type User = {
  id: string;
  name: string;
  email: string;
  userType: 'patient' | 'doctor' | 'admin';
  gender: 'ذكر' | 'أنثى';
  avatar: string;
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'unverified';
  // Doctor specific fields
  phone?: string;
  bio?: string;
  specialty?: string;
  city?: string;
};

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const userType = cookieStore.get('session_userType')?.value;
  const userName = cookieStore.get('session_userName')?.value;
  const userEmail = cookieStore.get('session_userEmail')?.value;

  if (!userType || !userEmail) {
    return null;
  }

  // Handle Admin User
  if (userType === 'admin' && userEmail === 'admin@tabeebk.com') {
    return {
      id: 'admin',
      name: 'المسؤول',
      email: 'admin@tabeebk.com',
      userType: 'admin',
      gender: 'ذكر',
      avatar: 'https://placehold.co/200.png',
      verificationStatus: 'unverified',
    };
  }

  // Handle Doctor User
  if (userType === 'doctor') {
    let doctorData: Doctor | undefined = doctors.find(d => d.email === userEmail);
    
    // If the doctor is not in our static data, it means they are a new user.
    // We build a temporary profile for them from the available cookie data.
    if (!doctorData && userName) {
        doctorData = {
            id: `new-doc-${userEmail}`,
            name: userName,
            email: userEmail,
            gender: 'ذكر', // Default gender
            profilePicture: 'https://placehold.co/200.png',
            verificationStatus: 'unverified',
            phone: '',
            specialty: '',
            city: '',
            bio: '',
            rating: 0,
            reviews: 0,
            subscription: { tier: 'أساسي', status: 'نشط' },
        };
    }
    
    if (doctorData) {
        // For both existing and new doctors, we construct the final user object.
        // We prioritize fresh data from cookies (simulating a live session update)
        // over the static data from our "database".
        return {
            id: doctorData.id,
            name: cookieStore.get('session_userName')?.value || doctorData.name,
            email: doctorData.email,
            userType: 'doctor',
            gender: doctorData.gender,
            avatar: doctorData.profilePicture,
            phone: cookieStore.get('session_userPhone')?.value || doctorData.phone,
            city: cookieStore.get('session_userCity')?.value || doctorData.city,
            specialty: cookieStore.get('session_userSpecialty')?.value || doctorData.specialty,
            bio: cookieStore.get('session_userBio')?.value || doctorData.bio,
            verificationStatus: (cookieStore.get('session_verificationStatus')?.value as User['verificationStatus']) || doctorData.verificationStatus,
        };
    }
  }

  // Handle Patient User
  if (userType === 'patient') {
    const existingPatient = patients.find(p => p.email === userEmail);
    if (existingPatient) {
        return {
            id: existingPatient.id,
            name: existingPatient.name,
            email: existingPatient.email,
            userType: 'patient',
            gender: 'أنثى', // Mock gender for patients
            avatar: 'https://placehold.co/200.png',
            verificationStatus: 'unverified',
        };
    }
    
    // Handle new patient from cookies
    if (userName) {
        return {
            id: `new-patient-${userEmail}`,
            name: userName,
            email: userEmail,
            userType: 'patient',
            gender: 'أنثى', // Mock gender for new patients
            avatar: 'https://placehold.co/200.png',
            verificationStatus: 'unverified',
        };
    }
  }

  return null;
}
