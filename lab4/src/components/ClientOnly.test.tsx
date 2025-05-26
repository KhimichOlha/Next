import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClientOnly } from './ClientOnly';
import React from 'react';

vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual<any>('@tanstack/react-query');
    return {
        ...actual,
        QueryClient: vi.fn(() => ({})), // заглушка
        QueryClientProvider: ({ children }: { children: React.ReactNode }) => children,
    };
});

describe('ClientOnly', () => {
    it('should render children wrapped in QueryClientProvider after mount', async () => {
        render(
            <ClientOnly>
                <div data-testid="test-child">Test Content</div>
            </ClientOnly>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });
});
