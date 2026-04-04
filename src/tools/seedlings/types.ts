export type PlantStatus = 'alive' | 'dead';

export interface PotSize {
    id: string;
    label: string;
    color: string;
    displaySize: number; // px diameter for the circle icon (16–64)
}

export interface SpeciesGoal {
    species: string;
    goal: number;
}

export interface Seedling {
    id: string;
    species: string;
    potSizeId: string;
    potNumber: number;
    status: PlantStatus;
}

export interface SeedlingState {
    goals: SpeciesGoal[];
    seedlings: Seedling[];
    potSizes: PotSize[];
}