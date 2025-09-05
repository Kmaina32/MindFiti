'use server';

/**
 * @fileOverview Implements the SanaBot AI Comprehensive Screening, a sophisticated mental health assessment
 * using multiple validated clinical instruments to provide a detailed analysis.
 *
 * - sanaBotScreening - The main function to call the screening flow.
 * - SanaBotScreeningInput - The input type for the screening, containing answers from all instruments.
 * - SanaBotScreeningOutput - The return type, providing a detailed clinical summary and recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for a single answer
const AnswerSchema = z.object({
  question: z.string(),
  answer: z.string().optional(),
});

// Define the input schema for the entire screening
export const SanaBotScreeningInputSchema = z.object({
  assessments: z.array(z.object({
      instrument: z.string(),
      answers: z.array(AnswerSchema),
    })
  ),
  age: z.number().describe('The age of the user.'),
  gender: z.string().describe('The gender of the user.'),
});
export type SanaBotScreeningInput = z.infer<typeof SanaBotScreeningInputSchema>;

// Define the output schema for the screening results
export const SanaBotScreeningOutputSchema = z.object({
  summary: z.string().describe('A comprehensive, clinical-style summary of the user\'s responses across all instruments (400-600 words). Synthesize findings, but do not diagnose. Use empathetic and supportive language.'),
  riskFactors: z.array(z.object({
    instrument: z.string().describe('The clinical instrument that flagged a potential risk (e.g., PHQ-9, GAD-7).'),
    concern: z.string().describe('A brief, clear description of the concern identified (e.g., "Elevated symptoms of depression").'),
    severity: z.enum(['low', 'moderate', 'high', 'significant']).describe('The assessed severity of the concern.'),
  })).describe('A list of potential risk factors identified from the screening.'),
  recommendations: z.array(z.string()).describe('A list of 5-7 clear, actionable next steps for the user, tailored to the findings. Include suggestions for professional consultation, self-help strategies, and relevant resources.'),
  isHighRisk: z.boolean().describe('A flag indicating if any area shows a high or significant risk that might require more immediate attention.'),
});
export type SanaBotScreeningOutput = z.infer<typeof SanaBotScreeningOutputSchema>;

// Exported function to be called from the frontend
export async function sanaBotScreening(input: SanaBotScreeningInput): Promise<SanaBotScreeningOutput> {
  return sanaBotScreeningFlow(input);
}

// Define the AI prompt for the screening analysis
const screeningPrompt = ai.definePrompt({
  name: 'sanaBotScreeningPrompt',
  input: {schema: SanaBotScreeningInputSchema},
  output: {schema: SanaBotScreeningOutputSchema},
  prompt: `
    You are SanaBot, a clinical assistant AI specializing in analyzing comprehensive mental health screenings.
    Your task is to review the user's responses from a battery of 13 validated clinical instruments, synthesize the findings into a supportive and informative report, and provide clear, actionable recommendations.

    USER PROFILE:
    - Age: {{{age}}}
    - Gender: {{{gender}}}

    ASSESSMENT RESPONSES:
    {{{JSON.stringify assessments}}}

    INSTRUCTIONS:
    1.  **Synthesize, Do Not Diagnose**: Carefully review the responses from all instruments. Your summary should be a holistic narrative, identifying patterns, overlapping symptoms, and key areas of concern. Use clinical, yet accessible and empathetic language. AVOID using diagnostic labels (e.g., "you have depression"). Instead, describe the symptoms (e.g., "Your responses suggest you are experiencing a significant level of depressive symptoms..."). The summary should be between 400 and 600 words.
    2.  **Identify Risk Factors**: Create a structured list of risk factors. For each concern, specify the instrument it came from, the nature of the concern, and a qualitative severity level (low, moderate, high, significant).
    3.  **Provide Actionable Recommendations**: Based on the synthesis, provide a list of 5-7 concrete, actionable next steps. These should be practical and supportive. Include a strong recommendation to consult with a healthcare professional for a formal diagnosis and treatment plan. Also suggest specific self-help strategies (e.g., mindfulness, sleep hygiene, connecting with support systems) and mention the types of resources available in the app (like the journal or community hub).
    4.  **Set High-Risk Flag**: Based on your overall analysis, determine if there is a high or significant risk in any area (e.g., severe depression, thoughts of self-harm, significant substance use). Set the 'isHighRisk' flag to true if such a risk is detected. This is critical for potential triaging.
    5.  **Maintain a Supportive Tone**: The user is vulnerable. Your tone must be consistently empathetic, non-judgmental, and empowering throughout the report.
  `,
});

// Define the Genkit flow for the screening
const sanaBotScreeningFlow = ai.defineFlow(
  {
    name: 'sanaBotScreeningFlow',
    inputSchema: SanaBotScreeningInputSchema,
    outputSchema: SanaBotScreeningOutputSchema,
  },
  async (input) => {
    const {output} = await screeningPrompt(input);
    return output!;
  }
);
