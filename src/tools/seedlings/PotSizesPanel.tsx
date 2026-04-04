import { useState } from 'react';
import { useSeedlingStore } from './useSeedlingStore';
import type {PotSize} from './types';
import styles from './PotSizesPanel.module.css';

type Props = { store: ReturnType<typeof useSeedlingStore> };

const SIZE_MIN = 14;
const SIZE_MAX = 64;

export default function PotSizesPanel({ store }: Props) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draft, setDraft] = useState<Partial<Omit<PotSize, 'id'>>>({});
    const [newForm, setNewForm] = useState({ label: '', color: '#9FE1CB', displaySize: 28 });

    function startEdit(pot: PotSize) {
        setEditingId(pot.id);
        setDraft({ label: pot.label, color: pot.color, displaySize: pot.displaySize });
    }

    function commitEdit(id: string) {
        store.updatePotSize(id, draft);
        setEditingId(null);
        setDraft({});
    }

    function handleAdd() {
        if (!newForm.label.trim()) return;
        store.addPotSize(newForm.label.trim(), newForm.color, newForm.displaySize);
        setNewForm({ label: '', color: '#9FE1CB', displaySize: 28 });
    }

    function canDelete(id: string) {
        return !store.state.seedlings.some(s => s.potSizeId === id && s.status === 'alive');
    }

    return (
        <section className={styles.panel}>
            <div className={styles.header}>
                <div className={styles.eyebrow}>Config</div>
                <h2 className={styles.title}>Pot Sizes</h2>
            </div>

            <div className={styles.list}>
                {store.state.potSizes.map(pot => {
                    const isEditing = editingId === pot.id;
                    return (
                        <div key={pot.id} className={`${styles.row} ${isEditing ? styles.rowEditing : ''}`}>
                            <div
                                className={styles.preview}
                                style={{ width: pot.displaySize, height: pot.displaySize, background: pot.color }}
                            />
                            {isEditing ? (
                                <div className={styles.editFields}>
                                    <input
                                        className={styles.textInput}
                                        value={draft.label ?? ''}
                                        onChange={e => setDraft(d => ({ ...d, label: e.target.value }))}
                                        placeholder="Label"
                                    />
                                    <div className={styles.colorRow}>
                                        <input
                                            type="color"
                                            className={styles.colorPicker}
                                            value={draft.color ?? '#ccc'}
                                            onChange={e => setDraft(d => ({ ...d, color: e.target.value }))}
                                        />
                                        <span className={styles.colorHex}>{draft.color}</span>
                                    </div>
                                    <div className={styles.sizeRow}>
                                        <input
                                            type="range"
                                            min={SIZE_MIN}
                                            max={SIZE_MAX}
                                            value={draft.displaySize ?? 32}
                                            onChange={e => setDraft(d => ({ ...d, displaySize: Number(e.target.value) }))}
                                            className={styles.slider}
                                        />
                                        <span className={styles.sizeVal}>{draft.displaySize}px</span>
                                    </div>
                                    <div className={styles.editBtns}>
                                        <button className={styles.saveBtn} onClick={() => commitEdit(pot.id)}>Save</button>
                                        <button className={styles.iconBtn} onClick={() => setEditingId(null)}>✕</button>
                                        {canDelete(pot.id) && (
                                            <button className={styles.deleteBtn} onClick={() => store.deletePotSize(pot.id)}>Delete</button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.meta} onClick={() => startEdit(pot)}>
                                    <span className={styles.potLabel}>{pot.label}</span>
                                    <span className={styles.potMeta}>{pot.displaySize}px · {pot.color}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={styles.addSection}>
                <div className={styles.addTitle}>New pot size</div>
                <input
                    className={styles.textInput}
                    placeholder="Label"
                    value={newForm.label}
                    onChange={e => setNewForm(f => ({ ...f, label: e.target.value }))}
                />
                <div className={styles.colorRow}>
                    <input
                        type="color"
                        className={styles.colorPicker}
                        value={newForm.color}
                        onChange={e => setNewForm(f => ({ ...f, color: e.target.value }))}
                    />
                    <span className={styles.colorHex}>{newForm.color}</span>
                </div>
                <div className={styles.sizeRow}>
                    <input
                        type="range"
                        min={SIZE_MIN}
                        max={SIZE_MAX}
                        value={newForm.displaySize}
                        onChange={e => setNewForm(f => ({ ...f, displaySize: Number(e.target.value) }))}
                        className={styles.slider}
                    />
                    <span className={styles.sizeVal}>{newForm.displaySize}px</span>
                </div>
                <button className={styles.addBtn} onClick={handleAdd}>+ Add</button>
            </div>
        </section>
    );
}