"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div>
            <nav className="flex gap-4 p-4 bg-gray-700">
                <Link 
                    href="/articles/favorite" 
                    className={pathname === '/articles/favorite' ? 'text-blue-600' : ''}
                >
                    Favorite
                </Link>
                <Link 
                    href="/articles/create" 
                    className={pathname === '/articles/create' ? 'text-blue-600' : ''}
                >
                    Create
                </Link>
            </nav>
            {children}
        </div>
    );
}