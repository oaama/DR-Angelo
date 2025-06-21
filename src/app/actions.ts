'use server';

import { aiDoctorMatch } from '@/ai/flows/ai-doctor-match';
import type { Doctor } from '@/lib/types';
import { z } from 'zod';
import { doctors as allDoctors } from '@/lib/data'; // Import the raw data array

const schema = z.object({
  description: z.string().min(10, { message: 'يجب أن يكون الوصف 10 أحرف على الأقل.' }),
});

export async function recommendDoctorAction(
  prevState: any,
  formData: FormData
): Promise<{ doctors: Doctor[] | null; message: string | null; }> {
  
  const validatedFields = schema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      doctors: null,
      message: validatedFields.error.flatten().fieldErrors.description?.[0] || 'إدخال غير صالح.',
    };
  }
  
  const medicalIssueDescription = validatedFields.data.description;

  try {
    const doctorNames = allDoctors.map(d => d.name);
    const result = await aiDoctorMatch({ 
      medicalIssueDescription,
      doctorList: doctorNames 
    });
    const recommendedNames = result.recommendedDoctors;

    if (!recommendedNames || recommendedNames.length === 0) {
      return { doctors: [], message: 'لم يتمكن الذكاء الاصطناعي من ترشيح طبيب. يرجى محاولة إعادة صياغة مشكلتك.' };
    }
    
    // Filter the local static data based on the names recommended by the AI
    const recommendedDoctors = allDoctors.filter(doctor => recommendedNames.includes(doctor.name));

    if (recommendedDoctors.length === 0) {
        return { doctors: [], message: 'تعذر العثور على طبيب مطابق في قاعدة بياناتنا بناءً على توصية الذكاء الاصطناعي.' };
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

    return { doctors: recommendedDoctors, message: null };
  } catch (error) {
    console.error('AI Doctor Match Error:', error);
    return { doctors: null, message: 'حدث خطأ غير متوقع في خدمة الذكاء الاصطناعي. يرجى المحاولة مرة أخرى في وقت لاحق.' };
  }
}
