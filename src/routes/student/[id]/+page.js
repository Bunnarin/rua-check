import { PUBLIC_PORTAL_API_KEY } from "$env/static/public";

export const ssr = false;

export const load = async ({ params }) => {
    const query = new URLSearchParams({
        filterByTk: params.id,
        appends: ['enrollments', 'enrollments.program', 'classes']
    });
    const res = await fetch(`https://rua.popok.uk/api/student:get?${query}`, {
        headers: {
            "Authorization": `Bearer ${PUBLIC_PORTAL_API_KEY}`
        },
    });
    const { data } = await res.json();
    data.classes = data.classes.map((c) => c.name).join(', ');
    return data;
};