import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  // Image data for p1.png has been embedded directly
  const imageBuffer =
    'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAIoSURBVFhH7ZfRbhwxFFN/9h5iJEko0kFC2w4sOF1wFapUqILSCQo3XAMJk6I4CSpQpYJLwF0kKFFQpE5C0gnKGxMvI3G8d7zZ2StnpB+ck3Fm+d43v3kzOzNHaGyMAyH35aQ9c/kYI0x3jQPhxdrnE4xwxZlS5FLaOpB3gUjVzLq4xSgYtJ3gMhBprg/Cg2C3/Q6QvF1a3wI98X1Tz4a/UYY+Bq/wxmC5y7A8v4EHD17g7oNDL5x63F+PB9YJmC5rgT8/vIFnL9yG11dXeB8/jYg5E0c3V4eToCgbfY2Q9xWxe36Wb2Yx92nAV3eQ9zM2u7LgG51rLTKGl/SjP/2+qf1QxJ/nK8A2P+4A10MAoH2zM82YkxyAs2Y2d/Z2QHAsbOnQCAQWj1y9/T85Jb3+XwA4OlTJ0AgEKgP6QeU9vV8Pj8+vA2IXdO00MtrAOCkPZXt8y2e/YSPj2/z59c3oGsjX+gY2zxuYycb+Xn9e8rJLx/4eSsohEAIBAKBwO+B2rB2/wLsnXkE4GgE+h1/yq/cAb+2kXgMgmCjB+B3bJ7b4U9f4f78kH/x5yD4q08gPQCqYRjA5w8fgSAQCAQCAfuwY3sb8M3V1wBw/swpQCAQCAQCW2c+AcBu7x6AQCAQCAQCAKpbH0GgP4QA7eIuRCAA+s/99/Dw+PqG2gGQLk+k2z01L405904Xv/nqfzBFM0yR/P5/AP8AzUj+t9fX/wAAAABJRU5ErkJggg==';

  return new ImageResponse(
    (
      <img
        width={32}
        height={32}
        src={`data:image/png;base64,${imageBuffer}`}
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
