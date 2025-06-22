'use server';

/**
 * @fileOverview This file implements the AI Doctor Match flow, which recommends relevant doctors based on a patient's description of their medical issue and provides preliminary advice.
 *
 * - aiDoctorMatch - A function that takes a patient's description of their medical issue and returns a list of recommended doctors and initial advice.
 * - AIDoctorMatchInput - The input type for the aiDoctorMatch function, which includes the patient's description.
 * - AIDoctorMatchOutput - The return type for the aiDoctorMatch function, which is a list of recommended doctors and preliminary advice.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DoctorInfoSchema = z.object({
  name: z.string().describe('اسم الطبيب'),
  specialty: z.string().describe('تخصص الطبيب'),
});

const AIDoctorMatchInputSchema = z.object({
  medicalIssueDescription: z
    .string()
    .describe('وصف للمشكلة الطبية للمريض.'),
  doctorList: z.array(DoctorInfoSchema).describe('قائمة بالأطباء المتاحين وتخصصاتهم.'),
});
export type AIDoctorMatchInput = z.infer<typeof AIDoctorMatchInputSchema>;

const AIDoctorMatchOutputSchema = z.object({
  recommendedDoctors: z
    .array(z.string())
    .describe('قائمة بأسماء الأطباء الموصى بهم بناءً على وصف المريض.'),
  preliminaryAdvice: z
    .string()
    .describe('نصيحة أولية مختصرة لتخفيف الأعراض حتى زيارة الطبيب. يجب أن تكون عامة ولا تغني عن الاستشارة الطبية.'),
});
export type AIDoctorMatchOutput = z.infer<typeof AIDoctorMatchOutputSchema>;

export async function aiDoctorMatch(input: AIDoctorMatchInput): Promise<AIDoctorMatchOutput> {
  return aiDoctorMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDoctorMatchPrompt',
  input: {schema: AIDoctorMatchInputSchema},
  output: {schema: AIDoctorMatchOutputSchema},
  prompt: `أنت مساعد طبي افتراضي وخبير في توجيه المرضى. مهمتك هي تحليل شكوى المريض واختيار الطبيب الأنسب من قائمة محددة وتقديم نصيحة أولية.

التعليمات:
1.  **تحليل الشكوى:** اقرأ شكوى المريض بعناية لفهم الأعراض الرئيسية.
    - شكوى المريض: "{{{medicalIssueDescription}}}"
    - تم تدريبك على فهم اللهجة المصرية العامية بمختلف تنوعاتها.

2.  **قائمة الأطباء المتاحة:** هذه هي القائمة الكاملة للأطباء الذين يمكنك الاختيار منهم. **لا يمكنك اختيار أطباء أو تخصصات غير موجودة في هذه القائمة.**
    {{#each doctorList}}
    - التخصص: {{{this.specialty}}}, الطبيب: {{{this.name}}}
    {{/each}}

3.  **اختيار التخصص وترشيح الطبيب:**
    - بناءً على تحليل الشكوى، حدد التخصص **الأنسب من القائمة المتاحة أعلاه**.
    - قم بإعادة قائمة بأسماء الأطباء (بحد أقصى ٣) الذين ينتمون إلى هذا التخصص. **يجب أن تكون الأسماء مطابقة تمامًا لما هو موجود في القائمة.**

4.  **في حالة عدم وجود تطابق:**
    - إذا لم يكن هناك أي تخصص في القائمة يبدو مناسبًا بشكل مباشر، اختر التخصص الأكثر عمومية وذا صلة، مثل "باطنة" أو "أطفال" إذا كانت الحالة تبدو عامة أو تخص طفلاً. **لا تخترع تخصصًا غير موجود في القائمة.**

5.  **صياغة نصيحة أولية:**
    - قدم نصيحة عامة وآمنة (جملة أو اثنتين) لتخفيف الأعراض بشكل مؤقت. **يجب أن تكون النصيحة آمنة تمامًا ولا تتضمن وصف أي أدوية.**

6.  **تكوين الإجابة:**
    - قم بتعبئة الحقول \`recommendedDoctors\` و \`preliminaryAdvice\` بالنتائج التي توصلت إليها.`,
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
