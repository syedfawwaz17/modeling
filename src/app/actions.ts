"use server";

import { highlightTopPhotos } from "@/ai/flows/highlight-top-photos";
import { suggestOutfitTransitions } from "@/ai/flows/ai-outfit-transitions";

export async function handleHighlightPhotos(photoUrls: string[]) {
  try {
    const result = await highlightTopPhotos({ photoDataUris: photoUrls });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error highlighting photos:", error);
    return { success: false, error: "Failed to highlight photos." };
  }
}

export async function handleSuggestTransition(formData: {
  image1DataUri: string;
  image2DataUri: string;
  transitionStyle: string;
}) {
  try {
    const result = await suggestOutfitTransitions(formData);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error suggesting outfit transition:", error);
    return { success: false, error: "Failed to suggest outfit transition." };
  }
}
