'use server';

/**
 * @fileOverview AI-powered journaling summary and sentiment analysis flow.
 *
 * - aiJournalSummary - A function that provides summaries and sentiment analysis for journal entries.
 * - AiJournalSummaryInput - The input type for the aiJournalSummary function.
 * - AiJournalSummaryOutput - The return type for the aiJournalSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiJournalSummaryInputSchema = z.object({
  text: z
    .string()
    .describe('The text content of the journal entry.'),
});
export type AiJournalSummaryInput = z.infer<typeof AiJournalSummaryInputSchema>;

const AiJournalSummaryOutputSchema = z.object({
  summary: z.string().describe('A short summary of the journal entry.'),
  sentimentScore: z
    .number()
    .describe('A numerical score indicating the sentiment of the journal entry.'),
  tags: z.array(z.string()).describe('An array of privacy-preserving tags for the journal entry.'),
});
export type AiJournalSummaryOutput = z.infer<typeof AiJournalSummaryOutputSchema>;

export async function aiJournalSummary(input: AiJournalSummaryInput): Promise<AiJournalSummaryOutput> {
  return aiJournalSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiJournalSummaryPrompt',
  input: {schema: AiJournalSummaryInputSchema},
  output: {schema: AiJournalSummaryOutputSchema},
  prompt: `You are a helpful AI assistant that analyzes journal entries and provides summaries, sentiment scores, and tags.

  Analyze the following journal entry:
  {{text}}

  Provide a short summary of the entry, a sentiment score (between -1 and 1), and a list of privacy-preserving tags.
  The sentiment score should reflect the overall emotional tone of the journal entry. The tags should capture the main themes and topics discussed in the entry without revealing any sensitive personal information.
  Return the answer in JSON format.
  `,
});

const aiJournalSummaryFlow = ai.defineFlow(
  {
    name: 'aiJournalSummaryFlow',
    inputSchema: AiJournalSummaryInputSchema,
    outputSchema: AiJournalSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
