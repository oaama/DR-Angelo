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
      gender: 'ذكر',
      avatar: 'https://placehold.co/200x200.png',
      verificationStatus: 'unverified',
    };
  }

  // Handle Doctor User
  if (userType === 'doctor') {
    const existingDoctor = doctors.find(d => d.email === userEmail);
    if (existingDoctor) {
      return {
        id: existingDoctor.id,
        name: existingDoctor.name,
        email: existingDoctor.email,
        userType: 'doctor',
        gender: existingDoctor.gender,
        avatar: existingDoctor.profilePicture,
        verificationStatus: existingDoctor.verificationStatus,
      };
    }
    // If not an existing doctor, it must be a new signup.
    // Use the cookie data.
    if (userName) {
      return {
        id: 'new_doctor',
        name: userName,
        email: userEmail,
        userType: 'doctor',
        gender: 'ذكر', // Default for new doctor
        avatar: 'https://placehold.co/200x200.png',
        verificationStatus: 'unverified',
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
            gender: 'أنثى', // Mock for patients
            avatar: 'https://placehold.co/200x200.png',
            verificationStatus: 'unverified',
        };
    }
    // If not an existing patient, it's a new signup.
    // Use the cookie data.
    if (userName) {
        return {
            id: 'new_patient',
            name: userName,
            email: userEmail,
            userType: 'patient',
            gender: 'أنثى', // Mock for patients
            avatar: 'https://placehold.co/200x200.png',
            verificationStatus: 'unverified',
        };
    }
  }

  return null;
}
