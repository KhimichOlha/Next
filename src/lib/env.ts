import "server-only";

export const SECRET_API_KEY = process.env.SECRET_API_KEY || "Not found";
export const NEXT_PUBLIC_APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Not found";

console.log("Server-side SECRET_API_KEY:", process.env.SECRET_API_KEY);
