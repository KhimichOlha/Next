import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@/generated/prisma";
import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import type { SessionStrategy } from "next-auth";


const prisma = new PrismaClient();

const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider(
            {
                clientId:     process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            }
        ),
        GitHubProvider(
            {
                clientId:     process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            }
        ),
    ],
    session: {
        strategy: "database" as SessionStrategy,
    },
    callbacks: {
        async session({ 
            session, 
            user, 
        }: {
            session: Session,
            user: AdapterUser,
        }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST,
}