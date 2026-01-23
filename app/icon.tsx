import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 512,
    height: 512,
};
export const contentType = 'image/png';

// Generate dynamic app icon
export default function Icon() {

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 400,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                📻
            </div>
        ),
        {
            ...size,
        }
    );
}
