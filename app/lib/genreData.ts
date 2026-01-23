import {
    Mic2,
    Guitar,
    Music2,
    Music4,
    Zap,
    Headphones,
    Heart,
    Sun,
    CloudRain,
    Skull,
    Compass,
    Flame,
    Disc3,
    Newspaper,
    MessageCircle,
    Trophy,
    Radio,
    TreePine,
    LucideIcon
} from 'lucide-react';

// Genre colors mapping
export const genreColors: Record<string, string> = {
    pop: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
    rock: 'linear-gradient(135deg, #ff5722 0%, #e91e63 100%)',
    jazz: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
    classical: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
    electronic: 'linear-gradient(135deg, #00bcd4 0%, #009688 100%)',
    'hip hop': 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
    country: 'linear-gradient(135deg, #8bc34a 0%, #4caf50 100%)',
    'r&b': 'linear-gradient(135deg, #e91e63 0%, #ff5722 100%)',
    reggae: 'linear-gradient(135deg, #4caf50 0%, #ffeb3b 100%)',
    blues: 'linear-gradient(135deg, #2196f3 0%, #3f51b5 100%)',
    metal: 'linear-gradient(135deg, #424242 0%, #212121 100%)',
    indie: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
    latin: 'linear-gradient(135deg, #ff9800 0%, #f44336 100%)',
    dance: 'linear-gradient(135deg, #e040fb 0%, #7c4dff 100%)',
    news: 'linear-gradient(135deg, #607d8b 0%, #455a64 100%)',
    talk: 'linear-gradient(135deg, #795548 0%, #5d4037 100%)',
    sports: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
    oldies: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
    soul: 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
    folk: 'linear-gradient(135deg, #8d6e63 0%, #6d4c41 100%)',
};

// Genre icons mapping
export const genreIcons: Record<string, LucideIcon> = {
    pop: Mic2,
    rock: Guitar,
    jazz: Music2,
    classical: Music4,
    electronic: Zap,
    'hip hop': Headphones,
    country: Guitar, // Acoustic usually implied
    'r&b': Heart,
    reggae: Sun,
    blues: CloudRain,
    metal: Skull,
    indie: Compass,
    latin: Flame,
    dance: Disc3,
    news: Newspaper,
    talk: MessageCircle,
    sports: Trophy,
    oldies: Radio,
    soul: Heart,
    folk: TreePine,
};

export function getGenreColor(genre: string): string {
    const lowerGenre = genre.toLowerCase();
    return genreColors[lowerGenre] || `linear-gradient(135deg, hsl(${genre.length * 30}, 60%, 45%) 0%, hsl(${genre.length * 40}, 50%, 35%) 100%)`;
}

export function getGenreIcon(genre: string): LucideIcon {
    const lowerGenre = genre.toLowerCase();
    return genreIcons[lowerGenre] || Music2;
}
