import type {PotSize, SeedlingState} from './types';

function uid(): string {
    return Math.random().toString(36).slice(2, 9);
}

export function addPotSize(state: SeedlingState, label: string, color: string, displaySize: number): SeedlingState {
    const pot: PotSize = { id: uid(), label, color, displaySize };
    return { ...state, potSizes: [...state.potSizes, pot] };
}

export function updatePotSize(state: SeedlingState, id: string, patch: Partial<Omit<PotSize, 'id'>>): SeedlingState {
    return { ...state, potSizes: state.potSizes.map(p => p.id === id ? { ...p, ...patch } : p) };
}

export function deletePotSize(state: SeedlingState, id: string): SeedlingState {
    const inUse = state.seedlings.some(s => s.potSizeId === id && s.status === 'alive');
    if (inUse) return state;
    return { ...state, potSizes: state.potSizes.filter(p => p.id !== id) };
}