import {useNavigate} from 'react-router-dom';
import {tools} from '../data/tools';
import styles from './Tools.module.css';

export default function Tools() {
    const navigate = useNavigate();

    return (
        <div>
            <header className={styles.pageHeader}>
                <div className={styles.eyebrow}>Utilities</div>
                <h1 className={styles.pageTitle}>Tools</h1>
            </header>

            <div className={styles.grid}>
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        className={`${styles.card} ${tool.status === 'soon' ? styles.cardSoon : ''}`}
                        onClick={() => tool.status === 'live' && navigate(tool.path)}
                    >
                        <div className={styles.icon}>{tool.icon}</div>
                        <div className={styles.name}>{tool.name}</div>
                        <div className={styles.desc}>{tool.description}</div>
                        <div className={styles.status}>
                            {tool.status === 'live' ? 'Open →' : 'Coming soon'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}