import { notFound } from 'next/navigation';

interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
}

interface Article {
    id: number;
    title: string;
    body: string;
}

async function getArticle(id: string): Promise<Article | undefined> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) return undefined;
    return res.json();
}

async function getComments(id: string): Promise<Comment[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    if (!res.ok) return [];
    return res.json();
}

export async function generateStaticParams() {
    return Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id }  = await params;

    const [article, comments] = await Promise.all([
        getArticle(id),
        getComments(id),
    ]);


    if (!article) return notFound();

    return (
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <p className="text-gray-300 mb-8">{article.body}</p>

        <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>
            
            {comments.map((comment) => (
            <div key={comment.id} className="mb-4 p-4 bg-green-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{comment.name}</span>
                <span className="text-gray-300 text-sm">({comment.email})</span>
                </div>
                <p className="text-gray-200">{comment.body}</p>
            </div>
            ))}
        </div>
        </div>
    );
}