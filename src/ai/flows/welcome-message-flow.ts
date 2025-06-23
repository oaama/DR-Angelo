'use server';
/**
 * @fileOverview Generates personalized welcome messages for new users.
 * - generateWelcomeMessage - A function that creates a welcome message.
 * - WelcomeMessageInput - The input type for the function.
 * - WelcomeMessageOutput - The return type for the function.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const WelcomeMessageInputSchema = z.object({
  name: z.string().describe('The name of the new user.'),
  userType: z.enum(['patient', 'doctor']).describe("The type of the user, which can be 'patient' or 'doctor'."),
});
export type WelcomeMessageInput = z.infer<typeof WelcomeMessageInputSchema>;

const WelcomeMessageOutputSchema = z.object({
  subject: z.string().describe('The subject line of the welcome email.'),
  body: z.string().describe('The body of the welcome email, written in a friendly and professional tone.'),
});
export type WelcomeMessageOutput = z.infer<typeof WelcomeMessageOutputSchema>;

export async function generateWelcomeMessage(input: WelcomeMessageInput): Promise<WelcomeMessageOutput> {
  return welcomeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'welcomeMessagePrompt',
  model: gemini15Flash,
  input: {schema: WelcomeMessageInputSchema},
  output: {schema: WelcomeMessageOutputSchema},
  prompt: `أنت مسؤول التواصل في منصة "طبيبك". مهمتك هي كتابة رسالة ترحيبية احترافية وشخصية للمستخدمين الجدد.

معلومات المستخدم:
- الاسم: {{{name}}}
- نوع المستخدم: {{{userType}}}

المطلوب:
1.  اكتب عنوان (subject) جذاب للبريد الإلكتروني.
2.  اكتب نص (body) الرسالة. يجب أن يكون دافئًا ومرحبًا.
3.  يجب أن يكون محتوى الرسالة مخصصًا لنوع المستخدم.
    - إذا كان نوع المستخدم هو 'patient' (مريض)، ركز على كيفية استفادته من المنصة للبحث عن الأطباء واستخدام ميزة الترشيح بالذكاء الاصطناعي.
    - إذا كان نوع المستخدم هو 'doctor' (طبيب)، ركز على أهمية إكمال ملفه الشخصي وتوثيق حسابه من خلال رفع كارنيه النقابة للوصول إلى المرضى.

يجب أن تكون اللغة عربية فصحى ومبسطة.`,
});

const welcomeMessageFlow = ai.defineFlow(
  {
    name: 'welcomeMessageFlow',
    inputSchema: WelcomeMessageInputSchema,
    outputSchema: WelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
