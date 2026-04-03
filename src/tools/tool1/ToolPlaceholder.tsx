import styles from './ToolPlaceholder.module.css';

export default function ToolPlaceholder() {
    return (
        <div>
            <header className={styles.pageHeader}>
                <div className={styles.eyebrow}>Tool</div>
                <h1 className={styles.pageTitle}>Gardening helper</h1>
            </header>
            <div className={styles.body}>
                <p>Placeholder</p>
            </div>
        </div>
    );
}