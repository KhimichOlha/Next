import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const books = await prisma.book.findMany();
        return Response.json(books, { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Error fetching books' }), { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { title, description, author, price } = data;

        const newBook = await prisma.book.create({
            data: { title, description, author, price },
        });

        return Response.json(newBook, { status: 201 });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Error creating book' }), { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const { id, title, description, author, price } = data;

        const updatedBook = await prisma.book.update({
            where: { id },
            data: { title, description, author, price },
        });

        return Response.json(updatedBook, { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Error updating book' }), { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const data = await req.json();
        const { id } = data;

        const deletedBook = await prisma.book.delete({ where: { id } });

        return Response.json(deletedBook, { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Error deleting book' }), { status: 500 });
    }
}
