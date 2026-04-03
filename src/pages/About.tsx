import styles from './About.module.css';
import logo from '../assets/robot-icon.svg';

export default function About() {
    return (
        <div className={styles.wrap}>
            <div className={styles.eyebrow}>Hello</div>
            <div className={styles.accentBar}/>
            <p className={styles.intro}>
                "I make things for myself... sometimes they are useful to others and sometimes just interesting."
            </p>
            <p className={styles.body}>
                I'm a developer and occasional writer.
                I work on tools that help people automate niche tasks, and I write about
                design, software, politics, and whatever else I can't stop thinking about.
            </p>
            <p className={styles.body}>
                This site is my small patch of the internet: a blog with a timeline of
                posts, and a growing collection of tools I've built for myself (and maybe
                for you).
            </p>

            <h3 className={styles.body}>
                Other Projects
            </h3>

            <h4 className={styles.body}>
                <a href='https://tgyal.github.io/dataviz-smood/' className={styles.link}>Smood Data Visualisation</a>
            </h4>
            <p className={styles.body}>
                A visualization project made at EPFL together with Tanguy Albrici and Fatine Benhsain. The end project
                displays which paths the Smood driver use most often, where the deliveries come from and go to.
            </p>
            <div className={styles.divider}/>

            <div className={styles.statRow}>
                <div className={styles.stat}>
                    <div className={styles.statNum}>12</div>
                    <div className={styles.statLabel}>Posts</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statNum}>4</div>
                    <div className={styles.statLabel}>Tools</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statNum}>3</div>
                    <div className={styles.statLabel}>Years online</div>
                </div>
            </div>

            <div className={styles.divider}/>

            <div className={styles.links}>
                <a className={styles.link} href="https://github.com/davidedidio" target="_blank"
                   rel="noreferrer">GitHub</a>
            </div>
            <img src={logo} alt="Logo"/>
        </div>
    );
}