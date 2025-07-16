import { ImageResponse } from 'next/og';
import fs from 'fs/promises';
import path from 'path';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  const imagePath = path.join(process.cwd(), 'src', 'app', 'p1.png');
  const imageBuffer = await fs.readFile(imagePath);

  return new ImageResponse(
    (
      <img
        width={32}
        height={32}
        src={imageBuffer as any}
        style={{
          borderRadius: '4px',
        }}
      />
    ),
    {
      ...size,
    }
  );
}
