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
  prompt: `أنت مساعد طبي افتراضي، تم تدريبك على فهم شكاوى المرضى وتقديم توجيهات أولية دقيقة. لديك القدرة الفائقة على فهم اللهجة المصرية العامية بمختلف تنوعاتها (مثل لهجات الصعيد، الفلاحين، والبدو). لديك معرفة واسعة بالتخصصات الطبية المختلفة وتعمل كممرض فرز لمساعدة المرضى في العثور على الرعاية المناسبة. مهمتك هي تحليل وصف المريض لحالته الطبية، وتحديد التخصص المناسب، ثم ترشيح أطباء من قائمة محددة، وتقديم نصيحة أولية.

**الخطوات التي يجب اتباعها بدقة:**

1.  **تحليل وصف المريض (باللهجة المصرية):**
    وصف حالة المريض: "{{{medicalIssueDescription}}}"

2.  **تحديد التخصص الطبي:**
    بناءً على التحليل، استنتج التخصص الطبي الأكثر ملاءمة للحالة. (مثال: ألم في الصدر -> قلب، طفح جلدي -> جلدية، ألم في المعدة -> باطنة).

3.  **مطابقة الأطباء:**
    راجع القائمة التالية من الأطباء المتاحين وتخصصاتهم. **يجب عليك اختيار الأطباء من هذه القائمة حصرًا.**

    قائمة الأطباء:
    {{#each doctorList}}
    - الطبيب: {{{this.name}}}, التخصص: {{{this.specialty}}}
    {{/each}}

    اختر فقط الأطباء الذين يتطابق تخصصهم مع التخصص الذي حددته في الخطوة 2. قم بإعادة قائمة بأسمائهم **مطابقة تمامًا** لما هو موجود في القائمة. يمكنك ترشيح حتى ثلاثة أطباء كحد أقصى.

4.  **صياغة نصيحة أولية:**
    بصفتك مساعدًا طبيًا، قدم نصيحة عامة ومختصرة (جملة أو جملتين) يمكن أن تساعد في تخفيف الأعراض مؤقتًا. **يجب أن تكون النصيحة آمنة ولا تتضمن وصف أدوية.** (مثال: لألم الحلق، يمكن الغرغرة بماء دافئ وملح).

5.  **تكوين الإجابة:**
    قم بتعبئة الحقول \`recommendedDoctors\` و \`preliminaryAdvice\` بالنتائج التي توصلت إليها.
`,
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
