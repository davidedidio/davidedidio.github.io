import {NavLink} from 'react-router-dom';
import {tools} from '../data/tools';
import styles from './Sidebar.module.css';
import {useSidebar} from "../context/SidebarContext.tsx";

export default function Sidebar() {
    const {collapsed, toggle} = useSidebar();

    return (
        <>
            <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
                <div className={styles.brand}>
                    <div className={styles.brandName}>Davide<br/>Di Dio</div>
                    <div className={styles.brandTagline}>personal site</div>
                </div>

                <nav className={styles.section}>
                    <div className={styles.sectionLabel}>Pages</div>
                    <NavLink
                        to="/"
                        end
                        className={({isActive}) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        <span className={styles.dot}/>
                        Blog
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({isActive}) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        <span className={styles.dot}/>
                        About
                    </NavLink>
                </nav>

                <nav className={styles.section}>
                    <div className={styles.sectionLabel}>Tools</div>
                    <NavLink
                        to="/tools"
                        end
                        className={({isActive}) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        <span className={styles.dot}/>
                        All Tools
                    </NavLink>
                    {tools.map((tool) => (
                        <NavLink
                            key={tool.id}
                            to={tool.path}
                            className={({isActive}) =>
                                `${styles.navItem} ${isActive ? styles.active : ''}`
                            }
                        >
                            <span className={styles.dot}/>
                            {tool.name}
                        </NavLink>
                    ))}
                </nav>

                <div className={styles.footer}>© 2026 · Built with React</div>
            </aside>

            <button className={`${styles.toggle} ${collapsed ? styles.toggleCollapsed : ''}`}
                    onClick={() => toggle()}>
                {collapsed ? '›' : '‹'}
            </button>
        </>
    );
}