'use server';
/**
 * @fileOverview Interprets a medical prescription image.
 * - analyzePrescription - A function that analyzes the prescription.
 * - PrescriptionAnalyzerInput - The input type for the function.
 * - PrescriptionAnalyzerOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrescriptionAnalyzerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a medical prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PrescriptionAnalyzerInput = z.infer<typeof PrescriptionAnalyzerInputSchema>;

const MedicationSchema = z.object({
    name: z.string().describe('اسم الدواء.'),
    dosage: z.string().describe('الجرعة المحددة للدواء (مثال: 500 مجم).'),
    frequency: z.string().describe('معدل تكرار تناول الدواء (مثال: مرتين يوميًا).'),
});

const PrescriptionAnalyzerOutputSchema = z.object({
  medications: z.array(MedicationSchema).describe('قائمة بالأدوية المذكورة في الروشتة.'),
  notes: z.string().describe('أي ملاحظات عامة أو تعليمات إضافية موجودة في الروشتة.'),
});
export type PrescriptionAnalyzerOutput = z.infer<typeof PrescriptionAnalyzerOutputSchema>;

export async function analyzePrescription(input: PrescriptionAnalyzerInput): Promise<PrescriptionAnalyzerOutput> {
  return prescriptionAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prescriptionAnalyzerPrompt',
  input: {schema: PrescriptionAnalyzerInputSchema},
  output: {schema: PrescriptionAnalyzerOutputSchema},
  prompt: `أنت صيدلي خبير ومساعد ذكاء اصطناعي. مهمتك هي قراءة وتفسير صورة روشتة طبية مقدمة من المستخدم بدقة.

التعليمات:
1.  **تفسير الصورة:** افحص الصورة التالية بعناية.
    - صورة الروشتة: {{media url=photoDataUri}}

2.  **استخراج الأدوية:**
    - حدد كل دواء مكتوب في الروشتة.
    - لكل دواء، استخرج اسمه، الجرعة المحددة له (مثال: "500 مجم"، "10 مل")، ومعدل تكرار الاستخدام (مثال: "قرص كل 12 ساعة"، "3 مرات يوميًا بعد الأكل").
    - إذا كانت الجرعة أو التكرار غير واضحين لدواء معين، اترك الحقل فارغًا أو اكتب "غير واضح".

3.  **استخراج الملاحظات:**
    - اقرأ أي ملاحظات أو تعليمات إضافية كتبها الطبيب وقم بتلخيصها.

4.  **تكوين الإجابة:**
    - قم بتعبئة الحقول \`medications\` و \`notes\` بالمعلومات التي استخرجتها.
    - **مهم جدًا:** يجب أن تنبه المستخدم في نهاية الملاحظات بأن هذا التفسير هو للمساعدة فقط ولا يغني إطلاقًا عن استشارة صيدلي متخصص ومراجعة الطبيب.`,
});

const prescriptionAnalyzerFlow = ai.defineFlow(
  {
    name: 'prescriptionAnalyzerFlow',
    inputSchema: PrescriptionAnalyzerInputSchema,
    outputSchema: PrescriptionAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
