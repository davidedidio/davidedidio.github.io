import {useMemo} from 'react';
import {posts} from '../data/posts.ts';
import type {Post} from '../types.ts';
import styles from './Blog.module.css';

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'});
}

function groupByYear(postList: Post[]): Record<string, Post[]> {
    return postList.reduce<Record<string, Post[]>>((acc, post) => {
        const year = post.date.slice(0, 4);
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {});
}

export default function Blog() {
    const sorted = useMemo(
        () => [...posts].sort((a, b) => b.date.localeCompare(a.date)),
        []
    );
    const grouped = useMemo(() => groupByYear(sorted), [sorted]);
    const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

    return (
        <div>
            <header className={styles.pageHeader}>
                <div className={styles.eyebrow}>Writing</div>
                <h1 className={styles.pageTitle}>All Posts</h1>
            </header>

            <div className={styles.timeline}>
                {years.map((year) => (
                    <div key={year} className={styles.yearBlock}>
                        <div className={styles.yearLabel}>{year}</div>
                        {grouped[year].map((post) => (
                            <article key={post.id} className={styles.postCard}>
                                <div className={styles.postMeta}>
                                    <span className={styles.postDate}>{formatDate(post.date)}</span>
                                    <span className={styles.postTag}>{post.tag}</span>
                                </div>
                                <h2 className={styles.postTitle}>{post.title}</h2>
                                <p className={styles.postExcerpt}>{post.excerpt}</p>
                                {/*<span className={styles.postRead}>Read →</span>*/}
                            </article>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}