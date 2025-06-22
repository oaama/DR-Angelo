'use server';

import { cookies } from 'next/headers';
import { doctors, patients } from './data';

// This is the unified User type used throughout the app for the current session user.
export type User = {
  id: string;
  name: string;
  email: string;
  userType: 'patient' | 'doctor' | 'admin';
  gender: 'ذكر' | 'أنثى';
  avatar: string;
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'unverified';
};

export async function getCurrentUser(): Promise<User | null> {
  const userType = cookies().get('session_userType')?.value;
  const userName = cookies().get('session_userName')?.value;
  const userEmail = cookies().get('session_userEmail')?.value;

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
      gender: 'ذكر', // Mock
      avatar: 'https://placehold.co/200x200.png',
      verificationStatus: 'unverified',
    };
  }

  // Handle Doctor User
  if (userType === 'doctor') {
    const doctor = doctors.find(d => d.email === userEmail);
    // If doctor not found in static data, it might be a new signup.
    // We must have at least a name from the cookie to proceed.
    if (!doctor && !userName) return null;

    return {
      id: doctor?.id || 'new_doctor',
      name: doctor?.name || userName!,
      email: userEmail,
      userType: 'doctor',
      gender: doctor?.gender || 'ذكر',
      avatar: doctor?.profilePicture || 'https://placehold.co/200x200.png',
      // New doctors who are not in the static data should have 'unverified' status by default
      verificationStatus: doctor?.verificationStatus || 'unverified', 
    };
  }

  // Handle Patient User
  if (userType === 'patient') {
    const patient = patients.find(p => p.email === userEmail);
    // If patient not found in static data (new signup), fallback to cookie data.
    if (!patient && !userName) return null;

    return {
      id: patient?.id || 'new_patient',
      name: patient?.name || userName!,
      email: userEmail,
      userType: 'patient',
      gender: 'أنثى', // Mock for patients
      avatar: 'https://placehold.co/200x200.png',
      verificationStatus: 'unverified', // Patients don't need verification
    };
  }

  return null;
}
