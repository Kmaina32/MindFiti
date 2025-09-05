import {z} from 'genkit';

/**
 * @fileOverview This file contains the Zod schemas and TypeScript types for the
 * SanaBot AI Comprehensive Screening flow. Separating schemas into their own
 * file is crucial for Next.js applications to avoid breaking "use server"
 * constraints, as schema objects cannot be exported from server-side files.
 */

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
