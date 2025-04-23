import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Link href="/vars">Task 1 (env vars)</Link>
          <Link href="/books">Task 2 API</Link>
      </div>
    </>
  );
}

