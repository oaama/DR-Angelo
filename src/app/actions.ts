'use server';

import { aiDoctorMatch } from '@/ai/flows/ai-doctor-match';
import { analyzePrescription } from '@/ai/flows/prescription-analyzer-flow';
import type { Doctor } from '@/lib/types';
import { z } from 'zod';
import { doctors as allDoctors } from '@/lib/data'; // Import the raw data array
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateWelcomeMessage } from '@/ai/flows/welcome-message-flow';
import { revalidatePath } from 'next/cache';
import { findMedication } from '@/ai/flows/medication-finder-flow';


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
    // CRITICAL: Only use verified doctors for AI recommendations.
    const verifiedDoctors = allDoctors.filter(d => d.verificationStatus === 'verified');
    const doctorInfoList = verifiedDoctors.map(d => ({ name: d.name, specialty: d.specialty }));
    
    const result = await aiDoctorMatch({ 
      medicalIssueDescription,
      doctorList: doctorInfoList 
    });
    const recommendedNames = result.recommendedDoctors;
    const advice = result.preliminaryAdvice;

    if (!recommendedNames || recommendedNames.length === 0) {
      return { doctors: [], message: 'لم يتمكن الذكاء الاصطناعي من ترشيح طبيب. يرجى محاولة إعادة صياغة مشكلتك.', advice: null };
    }
    
    // Filter the verified doctors list based on the names recommended by the AI
    const recommendedDoctors = verifiedDoctors.filter(doctor => recommendedNames.includes(doctor.name));

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


const signupSchema = z.object({
  firstName: z.string().min(1, { message: 'الاسم الأول مطلوب.' }),
  lastName: z.string().min(1, { message: 'الاسم الأخير مطلوب.' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح.' }),
  password: z.string().min(6, { message: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.' }),
  userType: z.enum(['patient', 'doctor']),
  phone: z.string().optional(),
});

export async function signupAction(prevState: any, formData: FormData) {
  const validatedFields = signupSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    userType: formData.get('userType'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'إدخال غير صالح.',
    };
  }
  
  const { firstName, lastName, email, userType, phone } = validatedFields.data;
  const fullName = `${firstName} ${lastName}`;

  // In a real app, you'd save the user to a database here.
  // For now, we'll just simulate it by setting cookies.

  // Check if user already exists (mock check)
  if (email === 'admin@tabeebk.com') {
      return { message: 'هذا البريد الإلكتروني مسجل بالفعل.' };
  }

  // Set session cookies for the new user
  cookies().set('session_userType', userType, { httpOnly: true, path: '/' });
  cookies().set('session_userName', fullName, { httpOnly: true, path: '/' });
  cookies().set('session_userEmail', email, { httpOnly: true, path: '/' });
  if (userType === 'doctor' && phone) {
    cookies().set('session_userPhone', phone, { httpOnly: true, path: '/' });
  }
    
  redirect('/profile'); // Redirect to profile page after signup
}


export async function logoutAction() {
    // Clear all session cookies
    const cookieStore = cookies();
    cookieStore.getAll().forEach(cookie => {
        if (cookie.name.startsWith('session_')) {
            cookieStore.delete(cookie.name);
        }
    });
    redirect('/');
}

// This action simulates a Google login by setting a cookie for a mock patient user.
export async function googleLoginAction() {
  cookies().set('session_userType', 'patient', { httpOnly: true, path: '/' });
  cookies().set('session_userName', 'سارة جوجل', { httpOnly: true, path: '/' });
  cookies().set('session_userEmail', 'sara.google@example.com', { httpOnly: true, path: '/' });
  
  redirect('/');
}

// --- Forgot Password Action ---
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح.' }),
});

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const validatedFields = forgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || 'إدخال غير صالح.',
      success: false,
    };
  }

  // In a real app, you would generate a reset token and send an email.
  // For this simulation, we always return a success message to prevent email enumeration.
  console.log(`--- Simulating password reset for: ${validatedFields.data.email} ---`);

  return {
    message: 'إذا كان هذا البريد الإلكتروني مسجلاً في نظامنا، فسيتم إرسال رابط لإعادة تعيين كلمة المرور إليه.',
    success: true,
  };
}

// --- Profile Actions ---

export async function updateAvatarAction(prevState: any, formData: FormData) {
    const avatarFile = formData.get('avatar-upload') as File;

    if (!avatarFile || avatarFile.size === 0) {
        return { message: 'لم يتم اختيار أي ملف.' };
    }
    // In a real app, you would upload this file to cloud storage
    // and update the user's avatar URL in the database.
    // For now, we just log it and revalidate the path to show a "saved" state.
    console.log(`--- Simulating avatar upload for file: ${avatarFile.name} ---`);
    
    revalidatePath('/profile');
    return { message: 'تم تحديث الصورة بنجاح!' };
}

const doctorProfileSchema = z.object({
    fullName: z.string().min(1, { message: 'الاسم الكامل مطلوب.' }),
    email: z.string().email({ message: 'البريد الإلكتروني غير صالح.' }),
    phone: z.string().min(10, { message: 'رقم الهاتف غير صالح.'}),
    city: z.string().min(1, { message: 'المدينة مطلوبة.' }),
    specialty: z.string().min(1, { message: 'التخصص مطلوب.' }),
    bio: z.string().min(20, { message: 'السيرة الذاتية يجب أن تكون 20 حرفًا على الأقل.' }).max(500, { message: 'السيرة الذاتية يجب أن تكون أقل من 500 حرف.' }),
});

export async function updateDoctorProfileAction(prevState: any, formData: FormData) {
    const validatedFields = doctorProfileSchema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        specialty: formData.get('specialty'),
        bio: formData.get('bio'),
    });

    if (!validatedFields.success) {
        // In a real app, you would return these errors to the form.
        // For now, we'll just log them and do nothing.
        console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
        return; 
    }
    
    // In a real app, you'd update the database here.
    // For now, we simulate updating by setting cookies to reflect changes.
    const { fullName, email, phone, city, specialty, bio } = validatedFields.data;
    const cookieStore = cookies();
    cookieStore.set('session_userName', fullName, { httpOnly: true, path: '/' });
    cookieStore.set('session_userEmail', email, { httpOnly: true, path: '/' });
    cookieStore.set('session_userPhone', phone, { httpOnly: true, path: '/' });
    cookieStore.set('session_userCity', city, { httpOnly: true, path: '/' });
    cookieStore.set('session_userSpecialty', specialty, { httpOnly: true, path: '/' });
    cookieStore.set('session_userBio', bio, { httpOnly: true, path: '/' });

    revalidatePath('/profile');
    redirect('/profile');
}

export async function requestVerificationAction(prevState: any, formData: FormData) {
    const idCardFile = formData.get('id-card-upload') as File;
    
    if (!idCardFile || idCardFile.size === 0) {
        // In a real app, you'd return an error message to the form.
        console.error('No file provided for verification.');
        return;
    }

    // In a real app, you would upload this file to cloud storage
    // and update the user's status to 'pending' in the database.
    // For now, we just simulate it by setting a cookie.
    cookies().set('session_verificationStatus', 'pending', { httpOnly: true, path: '/' });
    
    revalidatePath('/profile');
    redirect('/profile');
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

export async function approveVerificationAction(formData: FormData) {
    const doctorId = formData.get('doctorId') as string;
    // In a real app, you'd update the doctor's status to 'verified' in the database.
    console.log(`--- Approving verification for Doctor ID: ${doctorId} ---`);
    revalidatePath('/admin/verifications');
    redirect('/admin/verifications');
}

export async function rejectVerificationAction(formData: FormData) {
    const doctorId = formData.get('doctorId') as string;
    // In a real app, you'd update the doctor's status to 'rejected' in the database.
    console.log(`--- Rejecting verification for Doctor ID: ${doctorId} ---`);
    revalidatePath('/admin/verifications');
    redirect('/admin/verifications');
}


// --- AI Actions ---

const prescriptionFileSchema = z.object({
    prescriptionImage: z
        .instanceof(File, { message: 'الرجاء اختيار صورة.' })
        .refine(file => file.size > 0, { message: 'الملف المختار فارغ.' })
        .refine(file => file.type.startsWith('image/'), { message: 'يجب أن يكون الملف المختار صورة.' }),
});

export async function analyzePrescriptionAction(prevState: any, formData: FormData) {
    const validatedFields = prescriptionFileSchema.safeParse({
        prescriptionImage: formData.get('prescriptionImage'),
    });

    if (!validatedFields.success) {
        return {
            analysis: null,
            message: validatedFields.error.flatten().fieldErrors.prescriptionImage?.[0] || 'إدخال غير صالح.',
        };
    }

    const { prescriptionImage } = validatedFields.data;

    try {
        const buffer = await prescriptionImage.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUri = `data:${prescriptionImage.type};base64,${base64}`;

        const result = await analyzePrescription({ photoDataUri: dataUri });

        if (!result || !result.medications) {
            return { analysis: null, message: 'لم يتمكن الذكاء الاصطناعي من تفسير الروشتة. حاول مرة أخرى بصورة أوضح.' };
        }

        return { analysis: result, message: null };

    } catch (error) {
        console.error('Prescription Interpretation Error:', error);
        return { analysis: null, message: 'حدث خطأ غير متوقع أثناء تفسير الروشتة. يرجى المحاولة مرة أخرى.' };
    }
}

const findMedicationSchema = z.object({
  medicationName: z.string().min(3, { message: 'يجب أن يكون اسم الدواء 3 أحرف على الأقل.' }),
});

export async function findMedicationAction(prevState: any, formData: FormData) {
  const validatedFields = findMedicationSchema.safeParse({
    medicationName: formData.get('medicationName'),
  });

  if (!validatedFields.success) {
    return {
      response: null,
      message: validatedFields.error.flatten().fieldErrors.medicationName?.[0] || 'إدخال غير صالح.',
    };
  }
  
  const { medicationName } = validatedFields.data;

  try {
    const result = await findMedication({ medicationName });
    return { response: result.responseMessage, message: null };
  } catch (error) {
    console.error('Find Medication AI Error:', error);
    return { response: null, message: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.' };
  }
}
