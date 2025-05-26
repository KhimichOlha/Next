import { NextResponse } from 'next/server';

const fetchQuote = async (apiKey: string) => {
    const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
            'X-Api-Key': apiKey,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch');
    }

    const data = await res.json();
    return data;
};

export async function GET() {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API_KEY is missing' }, { status: 500 });
    }

    try {
        const quotes = await fetchQuote(apiKey);
        return NextResponse.json(quotes);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
    }
}