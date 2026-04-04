import type {Tool} from '../types';

export const tools: Tool[] = [
    {
        id: '1',
        name: 'Seedlings',
        description: 'Helps manage your seedlings',
        icon: '🌱',
        status: 'live',
        path: '/tools/tool-one',
    },
    {
        id: '2',
        name: 'Serpentaire CA',
        description: "A compagnon app for the book 'le Serpentaire', helps you track the character stats and simulates the combats for you.",
        icon: '📖',
        status: 'live',
        path: '/tools/tool-two',
    },
];