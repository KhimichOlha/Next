import FavoriteArticle from '@/components/FavoriteArticle';
import { Suspense } from 'react';

export default function FavoritePage() {
    return (
        <div>
            <h1 className="text-4xl">Favorite</h1>
            <div className="flex flex-col gap-4">
                {[1, 2, 3].map((id) => (
                    <Suspense key={id} fallback={<div>Load article {id}...</div>}>
                        <FavoriteArticle id={id} />
                    </Suspense>
                ))}
            </div>
        </div>
    );
}