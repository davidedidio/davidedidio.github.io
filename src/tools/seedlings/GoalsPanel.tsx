import {useState} from 'react';
import {useSeedlingStore} from './useSeedlingStore';
import styles from './GoalsPanel.module.css';

type Props = { store: ReturnType<typeof useSeedlingStore> };

export default function GoalsPanel({store}: Props) {
    const [newSpecies, setNewSpecies] = useState('');
    const [editingGoal, setEditingGoal] = useState<string | null>(null);

    function handleAdd() {
        const name = newSpecies.trim();
        if (!name) return;
        store.addSpecies(name);
        setNewSpecies('');
    }
    return (
        <section className={styles.panel}>
            <div className={styles.header}>
                <div className={styles.eyebrow}>Goals</div>
                <h2 className={styles.title}>Species</h2>
            </div>

            <div className={styles.list}>
                {store.goalProgress.map(({species, goal, alive, pct}) => {
                    const canDelete = alive === 0;
                    const isEditing = editingGoal === species;
                    return (
                        <div key={species} className={styles.row}>
                            <div className={styles.rowTop}>
                                <span className={styles.species}>{species}</span>
                                <div className={styles.controls}>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="number"
                                                min={0}
                                                className={styles.goalInput}
                                                defaultValue={goal}
                                                autoFocus
                                                onChange={e => store.updateGoal(species, parseInt(e.target.value))}
                                                onKeyDown={e => e.key === 'Enter' && setEditingGoal(null)}
                                            />
                                            <button
                                                className={styles.saveBtn}
                                                title="Save goal change"
                                                onClick={() => setEditingGoal(null)}
                                            >save</button>
                                            {canDelete && (
                                                <button
                                                    className={styles.deleteBtn}
                                                    title="Delete species"
                                                    onClick={() => store.deleteSpecies(species)}
                                                >delete</button>
                                            )}
                                        </>
                                    ) : (
                                        <button className={styles.countPill} onClick={() => setEditingGoal(species)}>
                                            {alive} / {goal}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className={styles.track}>
                                <div
                                    className={styles.fill}
                                    style={{
                                        width: `${pct * 100}%`,
                                        background: pct >= 1 ? '#1D9E75' : pct > 0.5 ? '#EF9F27' : '#D85A30',
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.addRow}>
                <input
                    className={styles.speciesInput}
                    placeholder="New species…"
                    value={newSpecies}
                    onChange={e => setNewSpecies(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                />
                <button className={styles.addBtn} onClick={handleAdd}>+</button>
            </div>
        </section>
    );
}