// src/ai/flows/suggest-solutions.ts
'use server';
/**
 * @fileOverview A flow to analyze a user's description of a car issue and suggest potential solutions.
 *
 * - suggestSolutions - A function that handles the suggestion of solutions based on the user's description.
 * - SuggestSolutionsInput - The input type for the suggestSolutions function.
 * - SuggestSolutionsOutput - The return type for the suggestSolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSolutionsInputSchema = z.object({
  description: z.string().describe('The user provided description of the car issue.'),
});
export type SuggestSolutionsInput = z.infer<typeof SuggestSolutionsInputSchema>;

const SuggestSolutionsOutputSchema = z.object({
  solutions: z.array(z.string()).describe('An array of suggested solutions based on the description.'),
});
export type SuggestSolutionsOutput = z.infer<typeof SuggestSolutionsOutputSchema>;

export async function suggestSolutions(input: SuggestSolutionsInput): Promise<SuggestSolutionsOutput> {
  return suggestSolutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSolutionsPrompt',
  input: {schema: SuggestSolutionsInputSchema},
  output: {schema: SuggestSolutionsOutputSchema},
  prompt: `You are an expert in roadside assistance and car issues. A user has described their car problem.

Description: {{{description}}}

Based on this description, suggest a few potential solutions or services that the user might need. Return the solutions as a JSON array of strings. Be specific and relevant to the description.`, 
});

const suggestSolutionsFlow = ai.defineFlow(
  {
    name: 'suggestSolutionsFlow',
    inputSchema: SuggestSolutionsInputSchema,
    outputSchema: SuggestSolutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
