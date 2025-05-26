import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchQuoteFromApi } from './QuoteFetcher';
import type { Quote } from './QuoteFetcher';

describe('fetchQuoteFromApi', () => {
    const mockQuote: Quote = {
        quote: 'Test quote',
        author: 'Test Author',
        category: 'Test Category',
    };

    beforeEach(() => {
        vi.resetAllMocks();
        global.fetch = vi.fn();
    });

    it('should return a quote when API call succeeds', async () => {
        (global.fetch as vi.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockQuote),
        });

        const result = await fetchQuoteFromApi();
        expect(result).toEqual(mockQuote);
        expect(global.fetch).toHaveBeenCalledWith('/api/quote');
    });

    it('should throw error when response is not ok', async () => {
        (global.fetch as vi.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        });

        await expect(fetchQuoteFromApi()).rejects.toThrow('Failed to fetch quotes');
    });

    it('should throw error when fetch fails', async () => {
        (global.fetch as vi.Mock).mockRejectedValueOnce(new Error('Network error'));
        await expect(fetchQuoteFromApi()).rejects.toThrow('Failed to fetch quotes');
    });

    it('should throw error when response parsing fails', async () => {
        (global.fetch as vi.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
        });

        await expect(fetchQuoteFromApi()).rejects.toThrow('Failed to fetch quotes');
    });
});