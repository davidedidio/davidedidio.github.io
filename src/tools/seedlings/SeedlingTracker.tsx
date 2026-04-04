import { useSeedlingStore } from './useSeedlingStore';
import Topbar from './Topbar';
import GoalsPanel from './GoalsPanel';
import PlantsPanel from './PlantsPanel';
import PotSizesPanel from './PotSizesPanel';
import styles from './SeedlingTracker.module.css';

export default function SeedlingTracker() {
    const store = useSeedlingStore();

    return (
        <div className={styles.page}>
            <Topbar store={store} />
            <div className={styles.body}>
                <GoalsPanel store={store} />
                <PlantsPanel store={store} />
                <PotSizesPanel store={store} />
            </div>
        </div>
    );
}