'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

export const ClientOnly = ({ children }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return <>
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
    </>;
};
