import type {SeedlingState} from './types';
import { DEFAULT_STATE } from './defaultState';

const KEY = 'seedling-tracker-v1';

export function loadState(): SeedlingState {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return structuredClone(DEFAULT_STATE);
        return JSON.parse(raw) as SeedlingState;
    } catch {
        return structuredClone(DEFAULT_STATE);
    }
}

export function saveState(state: SeedlingState): void {
    localStorage.setItem(KEY, JSON.stringify(state));
}

export function exportJSON(state: SeedlingState): void {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seedlings-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export function importJSON(file: File): Promise<SeedlingState> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            try {
                const parsed = JSON.parse(e.target?.result as string) as SeedlingState;
                resolve(parsed);
            } catch {
                reject(new Error('Invalid JSON file'));
            }
        };
        reader.onerror = () => reject(new Error('Could not read file'));
        reader.readAsText(file);
    });
}