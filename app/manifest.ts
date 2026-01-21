import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'RadioLIV - Online Radio Player',
        short_name: 'RadioLIV',
        description: 'Listen to thousands of free online radio stations from around the world.',
        start_url: '/',
        display: 'standalone',
        background_color: '#1a1b26',
        theme_color: '#e91e63',
        icons: [
            {
                src: '/icon?size=192',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon?size=512',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        orientation: 'portrait-primary',
        categories: ['entertainment', 'music', 'radio'],
        shortcuts: [
            {
                name: 'Favorites',
                short_name: 'Favorites',
                description: 'Go to your favorite stations',
                url: '/favorites',
                icons: [{ src: '/icon?size=192', sizes: '192x192' }]
            },
        ]
    };
}
