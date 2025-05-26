import { GET } from '@/app/api/quote/route';
import { NextResponse } from 'next/server';
import { expect, describe, it, vi, beforeEach } from 'vitest';

// Mock the global fetch function
vi.stubGlobal('fetch', vi.fn());

describe('GET /api/quote', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        process.env.API_KEY = 'test-api-key';
    });

    it('should return quotes when API call is successful', async () => {
        const mockQuotes = [{ quote: 'Test quote', author: 'Test Author' }];
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockQuotes),
        });

        const response = await GET();

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(mockQuotes);
        expect(fetch).toHaveBeenCalledWith('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': 'test-api-key',
            },
        });
    });

    it('should return 500 error when API_KEY is missing', async () => {
        delete process.env.API_KEY;

        const response = await GET();

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ error: 'API_KEY is missing' });
        expect(fetch).not.toHaveBeenCalled();
    });

    it('should return 500 error when fetch fails', async () => {
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        const response = await GET();

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ error: 'Failed to fetch quotes' });
    });

    it('should return 500 error when API throws an error', async () => {
        (fetch as vi.Mock).mockRejectedValueOnce(new Error('Network error'));

        const response = await GET();

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ error: 'Failed to fetch quotes' });
    });
});