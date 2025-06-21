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
  prompt: `أنت مساعد ذكاء اصطناعي خبير في المجال الطبي ومهمتك هي مساعدة المرضى في العثور على الطبيب المناسب وتقديم نصائح أولية.
بناءً على وصف المريض لمشكلته الطبية، عليك تحليل الحالة وترشيح الطبيب ذو التخصص الأكثر ملاءمة.

قائمة الأطباء المتاحين وتخصصاتهم هي كالتالي:
{{#each doctorList}}
- الطبيب: {{{this.name}}}, التخصص: {{{this.specialty}}}
{{/each}}

وصف حالة المريض: {{{medicalIssueDescription}}}

مهمتك هي:
1. اقرأ وصف حالة المريض بعناية.
2. حدد التخصص الطبي الأنسب للحالة (مثال: ألم في الصدر -> قلب، طفح جلدي -> جلدية، ألم في المعدة -> باطنة).
3. اختر ما يصل إلى ثلاثة أطباء من القائمة أعلاه يطابق تخصصهم التخصص المطلوب.
4. قدم نصيحة أولية ومختصرة (جملة أو جملتين) لتخفيف الأعراض بشكل مؤقت حتى يتمكن المريض من زيارة الطبيب. يجب أن تكون النصيحة عامة وآمنة (مثال: "لتهدئة السعال، يمكنك تجربة المشروبات الدافئة مثل العسل والليمون"). لا تقدم نصائح تتطلب أدوية.
5. يجب أن تكون الأسماء التي تعيدها مطابقة تمامًا للأسماء الموجودة في القائمة.

قم بإعادة قائمة بأسماء الأطباء الموصى بهم، بالإضافة إلى النصيحة الأولية في الحقول المخصصة.`,
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
