'use server';

/**
 * @fileOverview This file implements the AI Doctor Match flow, which recommends relevant doctors based on a patient's description of their medical issue.
 *
 * - aiDoctorMatch - A function that takes a patient's description of their medical issue and returns a list of recommended doctors.
 * - AIDoctorMatchInput - The input type for the aiDoctorMatch function, which includes the patient's description.
 * - AIDoctorMatchOutput - The return type for the aiDoctorMatch function, which is a list of recommended doctors.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDoctorMatchInputSchema = z.object({
  medicalIssueDescription: z
    .string()
    .describe('وصف للمشكلة الطبية للمريض.'),
  doctorList: z.array(z.string()).describe('قائمة بأسماء الأطباء المتاحين للاختيار من بينهم.'),
});
export type AIDoctorMatchInput = z.infer<typeof AIDoctorMatchInputSchema>;

const AIDoctorMatchOutputSchema = z.object({
  recommendedDoctors: z
    .array(z.string())
    .describe('قائمة بأسماء الأطباء الموصى بهم بناءً على وصف المريض.'),
});
export type AIDoctorMatchOutput = z.infer<typeof AIDoctorMatchOutputSchema>;

export async function aiDoctorMatch(input: AIDoctorMatchInput): Promise<AIDoctorMatchOutput> {
  return aiDoctorMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDoctorMatchPrompt',
  input: {schema: AIDoctorMatchInputSchema},
  output: {schema: AIDoctorMatchOutputSchema},
  prompt: `أنت مساعد ذكاء اصطناعي مصمم لترشيح الأطباء بناءً على وصف المريض لمشكلته الطبية. مهمتك هي اختيار الأطباء الأكثر ملاءمة من القائمة المقدمة فقط.

يجب أن يكون الناتج قائمة بأسماء الأطباء الذين اخترتهم، بحد أقصى 3 أطباء. يجب أن تكون الأسماء التي تعيدها مطابقة تمامًا للأسماء الموجودة في القائمة.

قائمة الأطباء المتاحين للاختيار منها:
{{#each doctorList}}
- {{{this}}}
{{/each}}

وصف حالة المريض: {{{medicalIssueDescription}}}

بناءً على الوصف، قم بترشيح الأطباء المناسبين من القائمة أعلاه.`,
});

const aiDoctorMatchFlow = ai.defineFlow(
  {
    name: 'aiDoctorMatchFlow',
    inputSchema: AIDoctorMatchInputSchema,
    outputSchema: AIDoctorMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
