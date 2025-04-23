"use client";

import React, { useEffect, useState } from 'react';

type Book = {
    id: number;
    title: string;
    description: string;
    author: string;
    price: string;
};

export default function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState<Book>({
        id: 0,
        title: '',
        description: '',
        author: '',
        price: ''
    });
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const fetchBooks = async () => {
        const response = await fetch('/api/books');
        if (!response.ok) {
            console.log('Error fetching books:', response.statusText);
            return;
        }
        try {
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.log('Error parsing JSON:', error);
        }
    };


    useEffect(() => {
        fetchBooks();
    }, []);

    const handleCreateBook = async () => {
        const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
        });
        const data = await response.json();
        if (!data.title || !data.description || !data.author || !data.price) {
            alert('All fields are required!');
            return;
        }

        setBooks((prevBooks) => [...prevBooks, data]);
        setNewBook({ id: 0, title: '', description: '', author: '', price: '' });
    };

    const handleUpdateBook = async () => {
        if (editingBook) {
        const response = await fetch('/api/books', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(editingBook)
        });
        const data = await response.json();
        if (!data.title || !data.description || !data.author || !data.price) {
            alert('All fields are required!');
            return;
        }
        
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
            book.id === data.id ? { ...book, ...data } : book
            )
        );
        setEditingBook(null);
        }
    };

    const handleDeleteBook = async (id: number) => {
        const response = await fetch('/api/books', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
        });
        if (response.ok) {
        setBooks(books.filter((book) => book.id !== id));
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-blue-950 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">📚 Book List</h1>
            <ul className="space-y-4">
                {books.map((book) => (
                    <li key={book.id} className="p-4 border rounded-lg shadow-sm bg-yellow-500">
                        <h3 className="text-lg font-semibold">{book.title}</h3>
                        <p className="text-gray-700">{book.description}</p>
                        <p className="text-gray-600">👤 Author: {book.author}</p>
                        <p className="text-gray-800 font-bold">💲 Price: ${book.price}</p>
                        <div className="mt-2 space-x-2">
                            <button
                                onClick={() => setEditingBook(book)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => handleDeleteBook(book.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className="text-xl font-semibold mt-6">➕ Add a New Book</h2>
            <div className="space-y-2">
                <input
                    type="text"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={newBook.price}
                    onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleCreateBook}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    ➕ Add Book
                </button>
            </div>

            {editingBook && (
                <div className="mt-6 p-4 border rounded-lg bg-yellow-700">
                    <h2 className="text-xl font-semibold">✏️ Edit Book</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editingBook.title}
                        onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editingBook.description}
                        onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={editingBook.author}
                        onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={editingBook.price}
                        onChange={(e) => setEditingBook({ ...editingBook, price: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    <div className="mt-2 space-x-2">
                        <button
                            onClick={handleUpdateBook}
                            className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                        >
                            ✅ Update
                        </button>
                        <button
                            onClick={() => setEditingBook(null)}
                            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
