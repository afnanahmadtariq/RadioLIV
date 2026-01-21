'use client';

import { useEffect } from 'react';

export default function PwaRegistrar() {
    useEffect(() => {
        if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
            // Register simple service worker
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((error) => {
                    console.log('SW registration failed: ', error);
                });
        }
    }, []);

    return null;
}
