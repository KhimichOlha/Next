"use client";
import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <Link href="/articles" className={styles.navLink}>
                Articles
            </Link>
        </nav>
    );
}