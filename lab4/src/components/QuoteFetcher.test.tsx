import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QuoteFetcher } from './QuoteFetcher';
import { useQuery } from '@tanstack/react-query';

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}));

describe('QuoteFetcher', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state initially', () => {
        (useQuery as vi.Mock).mockReturnValue({
        data: null,
        error: null,
        isLoading: true,
        refetch: vi.fn(),
        });

        render(<QuoteFetcher />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state if fetching fails', () => {
        const error = new Error('Failed to fetch quotes');
        (useQuery as vi.Mock).mockReturnValue({
        data: null,
        error,
        isLoading: false,
        refetch: vi.fn(),
        });

        render(<QuoteFetcher />);
        expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
    });

    it('renders quote data if fetching is successful', () => {
        const quote = {
        quote: 'Test quote',
        author: 'Test author',
        category: 'Test category',
        };
        (useQuery as vi.Mock).mockReturnValue({
        data: quote,
        error: null,
        isLoading: false,
        refetch: vi.fn(),
        });

        render(<QuoteFetcher />);
        expect(screen.getByText(`"${quote.quote}"`)).toBeInTheDocument();
        expect(screen.getByText(`— ${quote.author}`)).toBeInTheDocument();
        expect(screen.getByText(`Category: ${quote.category}`)).toBeInTheDocument();
    });

    it('calls refetch when button is clicked', () => {
        const refetch = vi.fn();
        (useQuery as vi.Mock).mockReturnValue({
        data: {
            quote: 'Test quote',
            author: 'Test author',
            category: 'Test category',
        },
        error: null,
        isLoading: false,
        refetch,
        });

        render(<QuoteFetcher />);
        fireEvent.click(screen.getByText('Get Another Quote'));
        expect(refetch).toHaveBeenCalled();
    });
});
