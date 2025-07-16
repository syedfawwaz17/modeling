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

const prompt = ai.definePrompt({
  name: 'suggestOutfitTransitionsPrompt',
  input: {schema: SuggestOutfitTransitionsInputSchema},
  output: {schema: SuggestOutfitTransitionsOutputSchema},
  prompt: `You are a fashion stylist creating outfit transitions between two given outfits.

  Given two outfit images and a transition style, create a description of how to transition from the first outfit to the second.

  Optionally, if you are able to generate the transition image, create it and return a data URI for the generated image in the "generatedImage" output field. Only generate the transition image if it is possible given the input outfits and styles.

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
    const {output} = await prompt(input);
    return output!;
  }
);
