
"use server";

import fs from "fs/promises";
import path from "path";
import mime from "mime-types";
import { highlightTopPhotos } from "@/ai/flows/highlight-top-photos";
import { suggestOutfitTransitions } from "@/ai/flows/ai-outfit-transitions";

const imageSrcToDataUri = async (filePath: string): Promise<string | null> => {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    const imageBuffer = await fs.readFile(fullPath);
    const mimeType = mime.lookup(fullPath) || 'image/jpeg';
    return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error converting image to data URI for ${filePath}:`, error);
    return null;
  }
};

export async function handleHighlightPhotos(photoSrcs: string[]) {
  try {
    const photoDataUris = (await Promise.all(photoSrcs.map(imageSrcToDataUri))).filter((uri): uri is string => uri !== null);

    if (photoDataUris.length === 0) {
      return { success: false, error: "Could not process any images." };
    }

    const result = await highlightTopPhotos({ photoDataUris });

    if (result.topPhotoDataUris) {
      const highlightedSrcs = result.topPhotoDataUris.map(highlightUri => {
        const originalIndex = photoDataUris.indexOf(highlightUri);
        return originalIndex !== -1 ? photoSrcs[originalIndex] : null;
      }).filter((src): src is string => src !== null);

      return { success: true, data: { topPhotoSrcs: highlightedSrcs } };
    }
    
    return { success: false, error: "No top photos returned from AI." };

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
