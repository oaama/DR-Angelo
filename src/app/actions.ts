'use server';

import { aiDoctorMatch } from '@/ai/flows/ai-doctor-match';
import { doctors } from '@/lib/data';
import type { Doctor } from '@/lib/types';
import { z } from 'zod';

const schema = z.object({
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
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
      message: validatedFields.error.flatten().fieldErrors.description?.[0] || 'Invalid input.',
    };
  }
  
  const medicalIssueDescription = validatedFields.data.description;

  try {
    const result = await aiDoctorMatch({ medicalIssueDescription });
    const recommendedNames = result.recommendedDoctors;

    if (!recommendedNames || recommendedNames.length === 0) {
      return { doctors: [], message: 'AI could not recommend a doctor. Please try rephrasing your issue.' };
    }

    const recommendedDoctors = doctors.filter(doctor => 
      recommendedNames.some(name => doctor.name.toLowerCase().includes(name.toLowerCase()))
    );

    if (recommendedDoctors.length === 0) {
        return { doctors: [], message: 'Could not find a matching doctor in our database based on the AI recommendation.' };
    }

    return { doctors: recommendedDoctors, message: null };
  } catch (error) {
    console.error('AI Doctor Match Error:', error);
    return { doctors: null, message: 'An unexpected error occurred with our AI service. Please try again later.' };
  }
}
