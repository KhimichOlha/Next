"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div>
        <nav className="flex gap-4 p-4 bg-gray-600">
            <Link href="/articles" className={pathname === '/articles' ? 'text-blue-600' : ''}>
                Articles
            </Link>
            <Link 
                href="/profile/settings" 
                className={pathname === '/profile/settings' ? 'text-blue-600' : ''}
            >
                Settings
            </Link>
            <Link 
                href="/profile/security" 
                className={pathname === '/profile/security' ? 'text-blue-600' : ''}
            >
                Security
            </Link>
        </nav>
            {children}
        </div>
    );
}