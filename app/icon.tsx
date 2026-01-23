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
                    fontSize: 300,
                    background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '20%',
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
