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
    .describe('A description of the patient medical issue.'),
});
export type AIDoctorMatchInput = z.infer<typeof AIDoctorMatchInputSchema>;

const AIDoctorMatchOutputSchema = z.object({
  recommendedDoctors: z
    .array(z.string())
    .describe('A list of recommended doctors based on the patient description.'),
});
export type AIDoctorMatchOutput = z.infer<typeof AIDoctorMatchOutputSchema>;

export async function aiDoctorMatch(input: AIDoctorMatchInput): Promise<AIDoctorMatchOutput> {
  return aiDoctorMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDoctorMatchPrompt',
  input: {schema: AIDoctorMatchInputSchema},
  output: {schema: AIDoctorMatchOutputSchema},
  prompt: `You are an AI assistant designed to recommend doctors based on a patient's description of their medical issue.  The output should be a list of doctors which should be as short as possible, with at most 3 doctors recommended.

Patient Description: {{{medicalIssueDescription}}}

Recommended Doctors:`,
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
