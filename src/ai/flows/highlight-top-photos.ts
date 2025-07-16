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
  photoDataUris: z.array(
    z.string().describe("A photo as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'.")
  ).describe('An array of photo data URIs to evaluate for highlighting.'),
});
export type HighlightTopPhotosInput = z.infer<typeof HighlightTopPhotosInputSchema>;

const HighlightTopPhotosOutputSchema = z.object({
  topPhotoDataUris: z.array(
    z.string().describe('Data URI of one of the top photos, based on engagement and aesthetic appeal')
  ).describe('An array of photo data URIs that are considered the top photos. This should be a subset of the input URIs.'),
});
export type HighlightTopPhotosOutput = z.infer<typeof HighlightTopPhotosOutputSchema>;

export async function highlightTopPhotos(input: HighlightTopPhotosInput): Promise<HighlightTopPhotosOutput> {
  return highlightTopPhotosFlow(input);
}

const highlightTopPhotosPrompt = ai.definePrompt({
  name: 'highlightTopPhotosPrompt',
  input: {schema: HighlightTopPhotosInputSchema},
  output: {schema: HighlightTopPhotosOutputSchema},
  prompt: `You are an AI expert in determining aesthetically pleasing and high engagement photos for a model's portfolio.

Given the following list of photos, select the top 3 photos based on aesthetic appeal, composition, lighting, and potential for high engagement. Return ONLY the data URIs of the top 3 photos in the output array. Do not include any other text or explanations.

Photos:
{{#each photoDataUris}}
- {{media url=this}}
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
