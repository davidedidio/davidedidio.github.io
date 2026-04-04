import type {SeedlingState} from './types';

export const DEFAULT_STATE: SeedlingState = {
    potSizes: [
        { id: 'plug',   label: 'Plug',   color: '#9FE1CB', displaySize: 18 },
        { id: 'small',  label: 'Small',  color: '#378ADD', displaySize: 26 },
        { id: 'medium', label: 'Medium', color: '#EF9F27', displaySize: 34 },
        { id: 'large',  label: 'Large',  color: '#D85A30', displaySize: 42 },
        { id: 'xlarge', label: 'XL',     color: '#7F77DD', displaySize: 50 },
    ],
    goals: [
        'Tomato', 'Pepper', 'Basil', 'Courgette', 'Aubergine',
        'Cucumber', 'Lettuce', 'Kale', 'Chard', 'Parsley',
    ].map(species => ({ species, goal: 6 })),
    seedlings: [],
};