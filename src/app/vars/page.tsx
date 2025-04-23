import { NEXT_PUBLIC_APP_NAME } from "@/lib/env";

export default function vars() {
    console.log("Client-side NEXT_PUBLIC_APP_NAME:", process.env.NEXT_PUBLIC_APP_NAME);

    return (
        <div>
        <h1>Змінні середовища у Next.js</h1>
        <p><strong>APP_NAME (client-side):</strong> {process.env.NEXT_PUBLIC_APP_NAME}</p>
        <p><strong>APP_NAME (server-side):</strong> {NEXT_PUBLIC_APP_NAME}</p>
        </div>
    );
}