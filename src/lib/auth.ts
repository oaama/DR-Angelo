import { cookies } from 'next/headers';

type User = {
  name: string;
  email: string;
  userType: 'patient' | 'doctor' | 'admin';
  gender: 'ذكر' | 'أنثى'; // Add other properties as needed
  avatar: string;
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'unverified';
};

export async function getCurrentUser(): Promise<User | null> {
  const userType = cookies().get('session_userType')?.value;
  const userName = cookies().get('session_userName')?.value;
  const userEmail = cookies().get('session_userEmail')?.value;

  if (!userType || !userName || !userEmail) {
    return null;
  }
  
  // This is still mock data for some fields.
  // In a real app, you'd fetch this from a database based on a user ID stored in the session.
  return {
    name: userName,
    email: userEmail,
    userType: userType as User['userType'],
    gender: 'ذكر', // Mocked for now
    avatar: 'https://placehold.co/200x200.png',
    verificationStatus: 'pending' // Mocked
  };
}
