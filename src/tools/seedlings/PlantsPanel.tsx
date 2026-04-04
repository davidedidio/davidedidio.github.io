import {useState} from 'react';
import {useSeedlingStore} from './useSeedlingStore';
import type {Seedling} from './types';
import styles from './PlantsPanel.module.css';

type Props = { store: ReturnType<typeof useSeedlingStore> };

export default function PlantsPanel({store}: Props) {
    const [filter, setFilter] = useState('');
    const [showDead, setShowDead] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [conflict, setConflict] = useState(false);
    const [addForm, setAddForm] = useState({
        species: '',
        potSizeId: store.state.potSizes[0]?.id ?? '',
        potNumber: '',
    });
    const [editForm, setEditForm] = useState<{ potSizeId: string; potNumber: string }>({
        potSizeId: '',
        potNumber: '',
    });

    const visible = store.filterSeedlings(filter, showDead);

    function handleAdd() {
        const num = parseInt(addForm.potNumber);
        if (!addForm.species || !addForm.potSizeId || isNaN(num)) return;
        if (store.isPotNumberTaken(addForm.potSizeId, num   )) return;
        store.addSeedling(addForm.species, addForm.potSizeId, num);
        setAddForm(f => ({...f, potNumber: ''}));
        setShowAddForm(false);
    }

    function startEdit(plant: Seedling) {
        setEditingId(plant.id);
        setEditForm({potSizeId: plant.potSizeId, potNumber: String(plant.potNumber)});
        setConflict(false);
    }

    function commitEdit(id: string) {
        const num = parseInt(editForm.potNumber);
        if (isNaN(num)) return;
        const ok = store.updateSeedling(id, {potSizeId: editForm.potSizeId, potNumber: num});
        if (ok) setEditingId(null);
        else setConflict(true);
    }

    function getPot(id: string) {
        return store.state.potSizes.find(p => p.id === id);
    }

    return (
        <section className={styles.panel}>
            <div className={styles.header}>
                <div className={styles.eyebrow}>Inventory</div>
                <h2 className={styles.title}>Seedlings</h2>
            </div>

            <div className={styles.toolbar}>
                <input
                    className={styles.search}
                    placeholder="Search species, size, number…"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
                <label className={styles.deadToggle}>
                    <input type="checkbox" checked={showDead} onChange={e => setShowDead(e.target.checked)}/>
                    Dead
                </label>
                <button className={styles.addBtn} onClick={() => setShowAddForm(v => !v)}>
                    {showAddForm ? '✕' : '+ Plant'}
                </button>
            </div>

            {showAddForm && (
                <div className={styles.addForm}>
                    <select
                        className={styles.select}
                        value={addForm.species}
                        onChange={e => setAddForm(f => ({...f, species: e.target.value}))}
                    >
                        <option value="">Species…</option>
                        {store.state.goals.map(g => <option key={g.species}>{g.species}</option>)}
                    </select>
                    <select
                        className={styles.select}
                        value={addForm.potSizeId}
                        onChange={e => setAddForm(f => ({...f, potSizeId: e.target.value}))}
                    >
                        {store.state.potSizes.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </select>
                    <input
                        className={styles.numInput}
                        type="number"
                        placeholder="Pot #"
                        value={addForm.potNumber}
                        onChange={e => setAddForm(f => ({...f, potNumber: e.target.value}))}
                        onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    />
                    <button className={styles.addBtn} onClick={handleAdd}>Add</button>
                </div>
            )}

            <div className={styles.legend}>
                {store.state.potSizes.map(p => (
                    <div key={p.id} className={styles.legendItem}>
                        <div className={styles.legendDot}
                             style={{background: p.color, width: p.displaySize * 0.45, height: p.displaySize * 0.45}}/>
                        <span>{p.label}</span>
                    </div>
                ))}
            </div>

            <div className={styles.list}>
                {visible.length === 0 && <div className={styles.empty}>No seedlings — add one above.</div>}
                {visible.map(plant => {
                    const pot = getPot(plant.potSizeId);
                    const isDead = plant.status === 'dead';
                    const isEditing = editingId === plant.id;

                    return (
                        <div
                            key={plant.id}
                            className={`${styles.card} ${isDead ? styles.dead : ''} ${isEditing ? styles.editing : ''}`}
                            onClick={() => !isEditing && startEdit(plant)}
                        >
                            <div
                                className={styles.potCircle}
                                style={{
                                    width: pot?.displaySize ?? 32,
                                    height: pot?.displaySize ?? 32,
                                    background: isDead ? '#B4B2A9' : (pot?.color ?? '#ccc'),
                                }}
                            >
                                <span className={styles.potNum}>{plant.potNumber}</span>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.infoSpecies}>{plant.species}</div>
                                <div className={styles.infoMeta}>{pot?.label ?? '—'} · #{plant.potNumber}</div>
                            </div>

                            {isEditing && (
                                <div className={styles.editPanel} onClick={e => e.stopPropagation()}>
                                    <select
                                        className={styles.select}
                                        value={editForm.potSizeId}
                                        onChange={e => {
                                            setEditForm(f => ({...f, potSizeId: e.target.value}));
                                            setConflict(false);
                                        }}
                                    >
                                        {store.state.potSizes.map(p => <option key={p.id}
                                                                               value={p.id}>{p.label}</option>)}
                                    </select>
                                    <input
                                        className={`${styles.numInput} ${conflict ? styles.conflict : ''}`}
                                        type="number"
                                        value={editForm.potNumber}
                                        onChange={e => {
                                            setEditForm(f => ({...f, potNumber: e.target.value}));
                                            setConflict(false);
                                        }}
                                        onKeyDown={e => e.key === 'Enter' && commitEdit(plant.id)}
                                    />
                                    {conflict && <span className={styles.conflictMsg}>Pot # taken</span>}
                                    <button className={styles.saveBtn} onClick={() => commitEdit(plant.id)}>Save
                                    </button>
                                    {!isDead
                                        ? <button className={styles.deadBtn} onClick={() => {
                                            store.updateSeedling(plant.id, {status: 'dead'});
                                            setEditingId(null);
                                        }}>Dead</button>
                                        : <>
                                            <button className={styles.reviveBtn} onClick={() => {
                                                store.updateSeedling(plant.id, {status: 'alive'});
                                                setEditingId(null);
                                            }}>Revive
                                            </button>
                                            <button className={styles.deadBtn} onClick={() => {
                                                store.deleteSeedling(plant);
                                                setEditingId(null);
                                            }}>Remove
                                            </button>
                                        </>
                                    }
                                    <button className={styles.iconBtn} onClick={() => setEditingId(null)}>✕</button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}