export default async function FavoriteArticle({ id }: { id: number }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const article = await res.json();

    return (
        <div className="p-4 border rounded bg-green-700">
            <h3>{article.title}</h3>
            <p>{article.body}</p>
        </div>
    );
}