// 'use server';

/**
 * @fileOverview AI-driven outfit transition generator for the 'Lookbook' feature.
 *
 * - suggestOutfitTransitions - A function that handles the outfit transition generation process.
 * - SuggestOutfitTransitionsInput - The input type for the suggestOutfitTransitions function.
 * - SuggestOutfitTransitionsOutput - The return type for the suggestOutfitTransitions function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOutfitTransitionsInputSchema = z.object({
  image1DataUri: z
    .string()
    .describe(
      "The first outfit image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  image2DataUri: z
    .string()
    .describe(
      "The second outfit image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  transitionStyle: z
    .string()
    .describe(
      'The desired style for the outfit transition, e.g., "elegant", "sporty", "casual".'
    ),
});
export type SuggestOutfitTransitionsInput = z.infer<
  typeof SuggestOutfitTransitionsInputSchema
>;

const SuggestOutfitTransitionsOutputSchema = z.object({
  transitionDescription: z
    .string()
    .describe('A textual description of the suggested outfit transition.'),
  generatedImage: z
    .string()
    .describe(
      'A data URI of the generated outfit transition image, including MIME type and Base64 encoding.'
    )
    .optional(), // generatedImage is optional since the prompt will attempt generation only if appropriate
});

export type SuggestOutfitTransitionsOutput = z.infer<
  typeof SuggestOutfitTransitionsOutputSchema
>;

export async function suggestOutfitTransitions(
  input: SuggestOutfitTransitionsInput
): Promise<SuggestOutfitTransitionsOutput> {
  return suggestOutfitTransitionsFlow(input);
}

const descriptionPrompt = ai.definePrompt({
  name: 'suggestOutfitTransitionsDescriptionPrompt',
  input: {schema: SuggestOutfitTransitionsInputSchema},
  output: {schema: z.object({ transitionDescription: z.string() }) },
  prompt: `You are a fashion stylist creating outfit transitions between two given outfits.

  Given two outfit images and a transition style, create a description of how to transition from the first outfit to the second.

  Here are the details of the outfit transition:
  Transition Style: {{{transitionStyle}}}
  Outfit 1: {{media url=image1DataUri}}
  Outfit 2: {{media url=image2DataUri}}

  Transition Description:`,
});

const suggestOutfitTransitionsFlow = ai.defineFlow(
  {
    name: 'suggestOutfitTransitionsFlow',
    inputSchema: SuggestOutfitTransitionsInputSchema,
    outputSchema: SuggestOutfitTransitionsOutputSchema,
  },
  async input => {
    // Step 1: Generate the description
    const { output: descriptionOutput } = await descriptionPrompt(input);
    const transitionDescription = descriptionOutput?.transitionDescription || 'A stylish transition.';

    // Step 2: Generate the image
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {text: `Generate an image that represents a transition between the two following outfits, based on this description: "${transitionDescription}". The transition style should be "${input.transitionStyle}".`},
        {media: {url: input.image1DataUri}},
        {media: {url: input.image2DataUri}}
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      transitionDescription,
      generatedImage: media?.url,
    };
  }
);
