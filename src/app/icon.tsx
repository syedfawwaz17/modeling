import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'hsl(240, 10%, 3.9%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'hsl(0, 0%, 98%)',
          borderRadius: '6px',
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
        }}
      >
        PB
      </div>
    ),
    {
      ...size,
    }
  );
}
