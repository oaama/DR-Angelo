'use server';

import { aiDoctorMatch } from '@/ai/flows/ai-doctor-match';
import type { Doctor } from '@/lib/types';
import { z } from 'zod';
import { doctors as allDoctors } from '@/lib/data'; // Import the raw data array
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateWelcomeMessage } from '@/ai/flows/welcome-message-flow';


const schema = z.object({
  description: z.string().min(10, { message: 'يجب أن يكون الوصف 10 أحرف على الأقل.' }),
});

export async function recommendDoctorAction(
  prevState: any,
  formData: FormData
): Promise<{ doctors: Doctor[] | null; message: string | null; advice: string | null; }> {
  
  const validatedFields = schema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      doctors: null,
      message: validatedFields.error.flatten().fieldErrors.description?.[0] || 'إدخال غير صالح.',
      advice: null,
    };
  }
  
  const medicalIssueDescription = validatedFields.data.description;

  try {
    const doctorInfoList = allDoctors.map(d => ({ name: d.name, specialty: d.specialty }));
    const result = await aiDoctorMatch({ 
      medicalIssueDescription,
      doctorList: doctorInfoList 
    });
    const recommendedNames = result.recommendedDoctors;
    const advice = result.preliminaryAdvice;

    if (!recommendedNames || recommendedNames.length === 0) {
      return { doctors: [], message: 'لم يتمكن الذكاء الاصطناعي من ترشيح طبيب. يرجى محاولة إعادة صياغة مشكلتك.', advice: null };
    }
    
    // Filter the local static data based on the names recommended by the AI
    const recommendedDoctors = allDoctors.filter(doctor => recommendedNames.includes(doctor.name));

    if (recommendedDoctors.length === 0) {
        return { doctors: [], message: 'تعذر العثور على طبيب مطابق في قاعدة بياناتنا بناءً على توصية الذكاء الاصطناعي.', advice: null };
    }

    // Sort recommended doctors by subscription tier first, then rating
    recommendedDoctors.sort((a, b) => {
      const tierOrder = { 'مميز': 1, 'احترافي': 1, 'أساسي': 2 };
      const tierA = tierOrder[a.subscription.tier] || 3;
      const tierB = tierOrder[b.subscription.tier] || 3;
      if (tierA !== tierB) {
        return tierA - tierB;
      }
      return b.rating - a.rating;
    });

    return { doctors: recommendedDoctors, message: null, advice: advice };
  } catch (error) {
    console.error('AI Doctor Match Error:', error);
    return { doctors: null, message: 'حدث خطأ غير متوقع في خدمة الذكاء الاصطناعي. يرجى المحاولة مرة أخرى في وقت لاحق.', advice: null };
  }
}

// --- Auth Actions ---

const loginSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح.' }),
  password: z.string().min(1, { message: 'كلمة المرور مطلوبة.' }),
});

export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'إدخال غير صالح.',
    };
  }
  
  const { email, password } = validatedFields.data;

  // In a real app, you'd look up the user in a database.
  // Here, we just check for the hardcoded admin user.
  if (email === 'admin@tabeebk.com' && password === 'password123') {
    // Set a session cookie
    cookies().set('session_userType', 'admin', { httpOnly: true, path: '/' });
    cookies().set('session_userName', 'المسؤول', { httpOnly: true, path: '/' });
    cookies().set('session_userEmail', 'admin@tabeebk.com', { httpOnly: true, path: '/' });
    
    redirect('/admin');
  }

  return { message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' };
}

export async function logoutAction() {
    cookies().delete('session_userType');
    cookies().delete('session_userName');
    cookies().delete('session_userEmail');
    redirect('/');
}

// This action simulates a Google login by setting a cookie for a mock patient user.
export async function googleLoginAction() {
  cookies().set('session_userType', 'patient', { httpOnly: true, path: '/' });
  cookies().set('session_userName', 'سارة جوجل', { httpOnly: true, path: '/' });
  cookies().set('session_userEmail', 'sara.google@example.com', { httpOnly: true, path: '/' });
  
  redirect('/');
}

// --- Admin Actions ---

export async function sendWelcomeMessageAction(name: string, userType: 'patient' | 'doctor'): Promise<{ success: boolean; message: string; subject?: string; }> {
  try {
    const result = await generateWelcomeMessage({ name, userType });
    // In a real app, you would send the email here.
    // For this demo, we'll just return the generated content.
    return { success: true, message: result.body, subject: result.subject };
  } catch (error) {
    console.error('Welcome Message Generation Error:', error);
    return { success: false, message: 'حدث خطأ أثناء إنشاء الرسالة الترحيبية.' };
  }
}
