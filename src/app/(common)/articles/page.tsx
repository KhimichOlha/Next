import { Suspense } from 'react';
import Link from 'next/link';

interface Article {
    id: number;
    title: string;
    body: string;
}

async function ArticlesList() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const articles = await res.json();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {articles.map((article: Article) => (
                <Link 
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="block p-6 bg-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    <p className="text-gray-300 line-clamp-3">
                        {article.body}
                    </p>
                </Link>
            ))}
        </div>
    );
}

export default function ArticlesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className='text-4xl font-bold text-gray-300'>All Articles</h1>
        <Suspense fallback={
            <div className="mt-8 text-gray-300">
            Loading...
            </div>
        }>
            <ArticlesList />
        </Suspense>
        </div>
    );
}