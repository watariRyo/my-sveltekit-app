import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
    return new Response(String(Math.random()));
}

export const prerender = true;