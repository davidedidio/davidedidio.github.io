import {useCallback, useEffect, useState} from 'react';
import type {Seedling, SeedlingState} from './types';
import {loadState, saveState} from './storageService';
import {
    addSeedling,
    deleteSeedling,
    filterSeedlings,
    getAliveCounts,
    isPotNumberTaken,
    updateSeedling
} from './seedlingService';
import {addSpecies, deleteSpecies, getGoalProgress, updateGoal} from './goalService';
import {addPotSize, deletePotSize, updatePotSize} from './potSizeService';

export function useSeedlingStore() {
    const [state, setStateRaw] = useState<SeedlingState>(loadState);

    const setState = useCallback((next: SeedlingState) => {
        setStateRaw(next);
        saveState(next);
    }, []);

    // sync across tabs
    useEffect(() => {
        const handler = () => setStateRaw(loadState());
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, []);

    const aliveCounts = getAliveCounts(state);
    const goalProgress = getGoalProgress(state.goals, aliveCounts);

    return {
        state,
        aliveCounts,
        goalProgress,

        // goals
        addSpecies: (species: string) => setState(addSpecies(state, species)),
        updateGoal: (species: string, goal: number) => setState(updateGoal(state, species, goal)),
        deleteSpecies: (species: string) => setState(deleteSpecies(state, species)),

        // seedlings
        isPotNumberTaken: (potSizeId: string, potNumber: number, excludedId?: string) => {
            return isPotNumberTaken(state, potSizeId, potNumber, excludedId)
        },
        addSeedling: (species: string, potSizeId: string, potNumber: number) =>
            setState(addSeedling(state, species, potSizeId, potNumber)),
        updateSeedling: (id: string, patch: Parameters<typeof updateSeedling>[2]) => {
            const {state: next, conflict} = updateSeedling(state, id, patch);
            if (!conflict) setState(next);
            return !conflict;
        },
        deleteSeedling: (seedling: Seedling) => {
            setState(deleteSeedling(state, seedling))
        },
        filterSeedlings: (query: string, showDead: boolean) =>
            filterSeedlings(state, query, showDead),

        // pot sizes
        addPotSize: (label: string, color: string, displaySize: number) =>
            setState(addPotSize(state, label, color, displaySize)),
        updatePotSize: (id: string, patch: Parameters<typeof updatePotSize>[2]) =>
            setState(updatePotSize(state, id, patch)),
        deletePotSize: (id: string) => setState(deletePotSize(state, id)),

        // import
        importState: (next: SeedlingState) => setState(next),
    };
}