import type {SeedlingState, SpeciesGoal} from './types';
import { getAliveCounts } from './seedlingService';

export function addSpecies(state: SeedlingState, species: string): SeedlingState {
    const name = species.trim();
    if (!name || state.goals.find(g => g.species === name)) return state;
    return { ...state, goals: [...state.goals, { species: name, goal: 6 }] };
}

export function updateGoal(state: SeedlingState, species: string, goal: number): SeedlingState {
    if (isNaN(goal) || goal < 0) return state;
    return { ...state, goals: state.goals.map(g => g.species === species ? { ...g, goal } : g) };
}

/** Deletes a species only if it has no alive seedlings */
export function deleteSpecies(state: SeedlingState, species: string): SeedlingState {
    const alive = getAliveCounts(state);
    if (alive[species]) return state;
    return {
        ...state,
        goals: state.goals.filter(g => g.species !== species),
        seedlings: state.seedlings.filter(s => s.species !== species),
    };
}

export function getGoalProgress(
    goals: SpeciesGoal[],
    aliveCounts: Record<string, number>
): Array<SpeciesGoal & { alive: number; pct: number }> {
    return goals.map(g => {
        const alive = aliveCounts[g.species] ?? 0;
        const pct = g.goal > 0 ? Math.min(alive / g.goal, 1) : 0;
        return { ...g, alive, pct };
    });
}