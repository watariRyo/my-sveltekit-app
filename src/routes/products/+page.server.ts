import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from "$env/dynamic/private";
import { secret } from '../lib/server/secrets';


console.log('$env/dynamic/private', env.Path)
console.log('$env/dynamic/private from .env', env.API_KEY)

export const load: PageServerLoad = async({ fetch, depends }) => {

    const response = await fetch('/api/products')
    depends('app:productsServerLoad')
    if (response.ok) {
        return {
            products: await response.json()
        }
    }
    const errorJSON = await response.json()
    throw error(response.status, errorJSON.message)
}