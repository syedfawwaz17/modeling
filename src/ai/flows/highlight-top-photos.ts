'use server';

/**
 * @fileOverview AI-powered feature to automatically highlight top photos based on engagement and aesthetic appeal.
 *
 * - highlightTopPhotos - A function that handles the photo highlighting process.
 * - HighlightTopPhotosInput - The input type for the highlightTopPhotos function.
 * - HighlightTopPhotosOutput - The return type for the highlightTopPhotos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightTopPhotosInputSchema = z.object({
  photoUrls: z.array(
    z.string().describe('URL of the photo to be evaluated')
  ).describe('An array of photo URLs to evaluate for highlighting.'),
});
export type HighlightTopPhotosInput = z.infer<typeof HighlightTopPhotosInputSchema>;

const HighlightTopPhotosOutputSchema = z.object({
  topPhotoUrls: z.array(
    z.string().describe('URL of the top photos, based on engagement and aesthetic appeal')
  ).describe('An array of photo URLs that are considered the top photos.'),
});
export type HighlightTopPhotosOutput = z.infer<typeof HighlightTopPhotosOutputSchema>;

export async function highlightTopPhotos(input: HighlightTopPhotosInput): Promise<HighlightTopPhotosOutput> {
  return highlightTopPhotosFlow(input);
}

const highlightTopPhotosPrompt = ai.definePrompt({
  name: 'highlightTopPhotosPrompt',
  input: {schema: HighlightTopPhotosInputSchema},
  output: {schema: HighlightTopPhotosOutputSchema},
  prompt: `You are an AI expert in determining aesthetically pleasing and high engagement photos.

Given the following list of photo URLs, select the top photos based on aesthetic appeal and potential for high engagement. Return ONLY the URLs of the top photos in the output array. Do not include any other text or explanations.

Photo URLs:
{{#each photoUrls}}
- {{{this}}}
{{/each}}
`,
});

const highlightTopPhotosFlow = ai.defineFlow(
  {
    name: 'highlightTopPhotosFlow',
    inputSchema: HighlightTopPhotosInputSchema,
    outputSchema: HighlightTopPhotosOutputSchema,
  },
  async input => {
    const {output} = await highlightTopPhotosPrompt(input);
    return output!;
  }
);
