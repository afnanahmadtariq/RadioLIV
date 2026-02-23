'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Check if it's a ChunkLoadError
        if (
            error.name === 'ChunkLoadError' ||
            error.message?.includes('Failed to load chunk') ||
            error.message?.includes('failed to fetch dynamically imported module') ||
            error.message?.includes('Loading chunk')
        ) {
            // It's likely a deploy happened while the user had the app open.
            // Forcefully reload the application to fetch the new code.
            window.location.reload();
        } else {
            // Log other errors to an error reporting service
            console.error(error);
        }
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Something went wrong!</h2>
            <p className="text-gray-400 mb-6 max-w-md">
                We encountered an unexpected error. If this happens repeatedly, please try refreshing the page.
            </p>
            <button
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
