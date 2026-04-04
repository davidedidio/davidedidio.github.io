import type {Seedling, SeedlingState} from './types';

function uid(): string {
    return Math.random().toString(36).slice(2, 9);
}

export function getAliveCounts(state: SeedlingState): Record<string, number> {
    const counts: Record<string, number> = {};
    state.seedlings.forEach(s => {
        if (s.status === 'alive') counts[s.species] = (counts[s.species] || 0) + 1;
    });
    return counts;
}

/** Returns true if a pot number is already taken by another seedling of the same species+potSize */
export function isPotNumberTaken(
    state: SeedlingState,
    potSizeId: string,
    potNumber: number,
    excludeId?: string
): boolean {
    return state.seedlings.some(
        s =>
            s.potSizeId === potSizeId &&
            s.potNumber === potNumber &&
            s.id !== excludeId
    );
}

export function addSeedling(
    state: SeedlingState,
    species: string,
    potSizeId: string,
    potNumber: number
): SeedlingState {
    if (isPotNumberTaken(state, potSizeId, potNumber)) return state;
    const seedling: Seedling = {id: uid(), species, potSizeId, potNumber, status: 'alive'};
    return {...state, seedlings: [...state.seedlings, seedling]};
}

export function deleteSeedling(
    state: SeedlingState,
    seedling: Seedling
): SeedlingState {
    if (seedling.status !== "dead") return state;
    return {...state, seedlings: [...state.seedlings.filter(s => s.id !== seedling.id)]};
}

export function updateSeedling(
    state: SeedlingState,
    id: string,
    patch: Partial<Pick<Seedling, 'potSizeId' | 'potNumber' | 'status'>>
): { state: SeedlingState; conflict: boolean } {
    const plant = state.seedlings.find(s => s.id === id);
    if (!plant) return {state, conflict: false};

    const newPotSizeId = patch.potSizeId ?? plant.potSizeId;
    const newPotNumber = patch.potNumber ?? plant.potNumber;
    const newStatus = patch.status ?? plant.status;

    if (
        newStatus === 'alive' &&
        (newPotSizeId !== plant.potSizeId || newPotNumber !== plant.potNumber) &&
        isPotNumberTaken(state, newPotSizeId, newPotNumber, id)
    ) {
        return {state, conflict: true};
    }

    return {
        conflict: false,
        state: {
            ...state,
            seedlings: state.seedlings.map(s =>
                s.id === id ? {...s, potSizeId: newPotSizeId, potNumber: newPotNumber, status: newStatus} : s
            ),
        },
    };
}

export function filterSeedlings(
    state: SeedlingState,
    query: string,
    showDead: boolean
): Seedling[] {
    const q = query.toLowerCase();
    return state.seedlings.filter(s => {
        if (!showDead && s.status === 'dead') return false;
        if (!q) return true;
        const potLabel = state.potSizes.find(p => p.id === s.potSizeId)?.label ?? '';
        return (
            s.species.toLowerCase().includes(q) ||
            String(s.potNumber).includes(q) ||
            potLabel.toLowerCase().includes(q)
        );
    });
}