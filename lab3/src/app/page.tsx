"use client";
import GoogleAuthButton from './components/GoogleAuthButton';
import GithubAuthButton from './components/GithubAuthButton';
import { SessionProvider, signOut, useSession } from 'next-auth/react';

export default function Home() {
  return (
    <SessionProvider>
      <AuthComponent />
    </SessionProvider>
  );
}

const AuthComponent: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-0">
        <h1 className="text-2xl font-bold">Вітаємо, {session.user?.name}</h1>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white"
          onClick={() => signOut()}
        >
          Вийти
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-0">
      <h1 className="text-2xl font-bold">Увійдіть до свого акаунту</h1>
      <GoogleAuthButton />
      <GithubAuthButton />
    </div>
  );
};