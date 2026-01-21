'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    fallback?: React.ReactNode;
}

export default function SafeImage({
    src,
    alt,
    width = 160,
    height = 160,
    className,
    style,
    fallback,
}: SafeImageProps) {
    const [hasError, setHasError] = useState(false);

    // Trim the URL to avoid issues with trailing spaces
    const cleanSrc = src?.trim() || '';

    if (hasError || !cleanSrc) {
        return fallback ? <>{fallback}</> : null;
    }

    return (
        <Image
            src={cleanSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
            unoptimized
            onError={() => setHasError(true)}
        />
    );
}
