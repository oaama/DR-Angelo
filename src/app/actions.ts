'use server';

import { aiDoctorMatch } from '@/ai/flows/ai-doctor-match';
import { doctors } from '@/lib/data';
import type { Doctor } from '@/lib/types';
import { z } from 'zod';

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
    const result = await aiDoctorMatch({ medicalIssueDescription });
    const recommendedNames = result.recommendedDoctors;

    if (!recommendedNames || recommendedNames.length === 0) {
      return { doctors: [], message: 'لم يتمكن الذكاء الاصطناعي من ترشيح طبيب. يرجى محاولة إعادة صياغة مشكلتك.' };
    }

    const recommendedDoctors = doctors.filter(doctor => 
      recommendedNames.some(name => doctor.name.toLowerCase().includes(name.toLowerCase()))
    );

    if (recommendedDoctors.length === 0) {
        return { doctors: [], message: 'تعذر العثور على طبيب مطابق في قاعدة بياناتنا بناءً على توصية الذكاء الاصطناعي.' };
    }

    return { doctors: recommendedDoctors, message: null };
  } catch (error) {
    console.error('AI Doctor Match Error:', error);
    return { doctors: null, message: 'حدث خطأ غير متوقع في خدمة الذكاء الاصطناعي. يرجى المحاولة مرة أخرى في وقت لاحق.' };
  }
}
