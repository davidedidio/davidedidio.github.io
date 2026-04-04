import { useRef } from 'react';
import { useSeedlingStore } from './useSeedlingStore';
import { exportJSON, importJSON } from './storageService';
import styles from './Topbar.module.css';

type Props = { store: ReturnType<typeof useSeedlingStore> };

export default function Topbar({ store }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);

    async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const next = await importJSON(file);
            store.importState(next);
        } catch {
            alert('Could not import: invalid file.');
        }
        e.target.value = '';
    }

    return (
        <div className={styles.bar}>
            <span className={styles.label}>🌱 Seedling Tracker</span>
            <div className={styles.actions}>
                <button className={styles.btn} onClick={() => exportJSON(store.state)}>Export JSON</button>
                <button className={styles.btn} onClick={() => fileRef.current?.click()}>Import JSON</button>
                <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
            </div>
        </div>
    );
}