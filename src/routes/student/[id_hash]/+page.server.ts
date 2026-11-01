import { UMS_API_KEY } from "$env/static/private";

export const ssr = true;

export const load = async ({ params }) => {
    const query = new URLSearchParams({
        filter: JSON.stringify({
            hashedId: params.id_hash
        }),
        appends: ['enrollments', 'enrollments.program', 'classes'],
        fields: ['enrollments', 'classes', 'id', 'khmerName', 'englishName', 'orientationGroup']
    });
    const res = await fetch(`https://rua.popok.uk/api/student:get?${query}`, {
        headers: {
            "Authorization": `Bearer ${UMS_API_KEY}`,
            // to allow cloudflare worker to bypass the only KH rules on WAF
            "X-Worker-Allow": "ruaadmin"
        },
    });
    const { data } = await res.json();
    data.classes = data.classes.map((c) => c.name).join(', ');
    return data;
};