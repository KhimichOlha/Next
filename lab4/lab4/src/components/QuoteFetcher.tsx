"use client";

import { useQuery } from "@tanstack/react-query";

export const fetchQuoteFromApi = async (): Promise<Quote> => {
    try {
        const res = await fetch("/api/quote");

        if (!res.ok) {
            throw new Error("Failed to fetch quotes");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to fetch quotes");
    }
};

export interface Quote {
    quote: string;
    author: string;
    category: string;
}

export const QuoteFetcher: React.FC = ( ) => {
    const { data: quote, error, isLoading, refetch } = useQuery({
        queryKey: ['quote'],
        queryFn: fetchQuoteFromApi,
    });


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {(error as Error).message}</p>;
    if (!quote) return <p>No quote found.</p>;

    return (
    <div className="quote bg-black text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
        <blockquote className="text-2xl italic mb-4">"{quote.quote}"</blockquote>
        <p className="text-lg font-semibold mb-2">— {quote.author}</p>
        <small className="text-sm text-gray-400">Category: {quote.category}</small>

        <br />
        <button 
            onClick={() => refetch()} 
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
            Get Another Quote
        </button>
    </div>

    );
};