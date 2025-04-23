const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.book.create({
        data: {
                title: "Book1",
                description: "Some description",
                author: "Author N.N.",
                price: "12.5",
        },
    });

    await prisma.book.create({
        data: {
                title: "Book2",
                description: "Some description",
                author: "Author N.N.",
                price: "12.5",
        },
    });

    await prisma.book.create({
        data: {
                title: "Book3",
                description: "Some description",
                author: "Author N.N.",
                price: "12.5",
        },
    });

    console.log('database seeded')
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });