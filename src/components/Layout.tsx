import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';
import {useSidebar} from "../context/SidebarContext.tsx";

export default function Layout() {
    const {collapsed} = useSidebar();
    return (
        <div className={styles.layout}>
            <Sidebar/>
            <main className={`${styles.main} ${collapsed ? styles.mainExpanded : ''}`}>
                <Outlet/>
            </main>
        </div>
    );
}