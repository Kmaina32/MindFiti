'use server';

/**
 * @fileOverview Implements a Genkit flow for detecting crisis risk from user inputs
 * and providing appropriate resources and escalation paths.
 *
 * - detectCrisisRisk - A function that detects crisis risk based on input text.
 * - DetectCrisisRiskInput - The input type for the detectCrisisRisk function.
 * - DetectCrisisRiskOutput - The return type for the detectCrisisRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectCrisisRiskInputSchema = z.object({
  text: z
    .string()
    .describe(
      'The text to analyze for potential self-harm risk, such as a journal entry or assessment response.'
    ),
});
export type DetectCrisisRiskInput = z.infer<typeof DetectCrisisRiskInputSchema>;

const DetectCrisisRiskOutputSchema = z.object({
  riskDetected: z.boolean().describe('Whether or not a crisis risk is detected.'),
  riskLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The level of risk detected.'),
  suggestedActions: z
    .array(z.string())
    .describe('A list of suggested actions to take based on the risk level.'),
});
export type DetectCrisisRiskOutput = z.infer<typeof DetectCrisisRiskOutputSchema>;

export async function detectCrisisRisk(input: DetectCrisisRiskInput): Promise<DetectCrisisRiskOutput> {
  return detectCrisisRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectCrisisRiskPrompt',
  input: {schema: DetectCrisisRiskInputSchema},
  output: {schema: DetectCrisisRiskOutputSchema},
  prompt: `You are an AI assistant designed to detect potential self-harm risk in user-provided text, such as journal entries or assessment responses.

  Analyze the following text and determine if it indicates a crisis situation requiring immediate intervention.

  Text: {{{text}}}

  Based on your analysis, determine the level of risk (low, medium, or high) and suggest appropriate actions to take.

  Output the response in JSON format with the following fields:
  - riskDetected: true if a risk is detected, false otherwise.
  - riskLevel: the level of risk detected (low, medium, or high).
  - suggestedActions: a list of suggested actions to take based on the risk level.  Include specific resources like crisis hotlines and emergency contacts if the risk is high.

  Example Output:
  {
    "riskDetected": true,
    "riskLevel": "high",
    "suggestedActions": [
      "Contact emergency services immediately.",
      "Call the suicide prevention hotline.",
      "Seek immediate medical attention.",
    ],
  }

  If no risk is detected, riskDetected should be false, riskLevel should be low, and suggestedActions should be an empty array.
`,
});

const detectCrisisRiskFlow = ai.defineFlow(
  {
    name: 'detectCrisisRiskFlow',
    inputSchema: DetectCrisisRiskInputSchema,
    outputSchema: DetectCrisisRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
