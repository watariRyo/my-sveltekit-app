import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ locals }) => {
    // const token = cookies.get('token')
    // throw error(401, 'Not Authorized!')
    const user = locals.user;
    return {
        user 
    };
}
