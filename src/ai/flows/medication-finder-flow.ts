'use server';
/**
 * @fileOverview A flow to handle user requests for finding missing medications.
 * - findMedication - A function that takes a medication name and returns a helpful response.
 * - FindMedicationInput - The input type for the function.
 * - FindMedicationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindMedicationInputSchema = z.object({
  medicationName: z.string().describe('اسم الدواء الذي يبحث عنه المستخدم.'),
});
export type FindMedicationInput = z.infer<typeof FindMedicationInputSchema>;

const FindMedicationOutputSchema = z.object({
  responseMessage: z.string().describe('رسالة ودودة ومفيدة للمستخدم حول طلبه.'),
});
export type FindMedicationOutput = z.infer<typeof FindMedicationOutputSchema>;

export async function findMedication(input: FindMedicationInput): Promise<FindMedicationOutput> {
  return findMedicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findMedicationPrompt',
  input: {schema: FindMedicationInputSchema},
  output: {schema: FindMedicationOutputSchema},
  prompt: `أنت مساعد صيدلي افتراضي. قام مستخدم بالإبلاغ عن دواء ناقص اسمه "{{medicationName}}".

  مهمتك هي صياغة رد ودود ومفيد.

  التعليمات:
  1.  اشكر المستخدم على الإبلاغ عن الدواء الناقص.
  2.  أخبره أننا سجلنا طلبه وسنعمل مع شركائنا من الصيدليات لمحاولة توفيره.
  3.  اقترح عليه أن يتحدث مع طبيبه أو صيدلي عن بدائل محتملة بنفس المادة الفعالة إذا كان الأمر عاجلاً.
  4.  اختتم الرسالة بنبرة إيجابية ومتعاونة.

  يجب أن تكون اللغة عربية فصحى ومبسطة.`,
});

const findMedicationFlow = ai.defineFlow(
  {
    name: 'findMedicationFlow',
    inputSchema: FindMedicationInputSchema,
    outputSchema: FindMedicationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
