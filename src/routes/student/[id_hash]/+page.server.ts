import { UMS_API_KEY, WORKER_PASS } from "$env/static/private";

export const ssr = true;

export const load = async ({ params, url }) => {
    const query = new URLSearchParams({
        filter: JSON.stringify({ hashedId: params.id_hash }),
        appends: ['enrollments', 'classes'],
        fields: ['enrollments', 'classes', 'id', 'khmerName', 'englishName', 'birthday', 'orientationGroup']
    });
    const res = await fetch(`https://rua.popok.uk/api/student:get?${query}`, {
        headers: {
            "Authorization": `Bearer ${UMS_API_KEY}`,
            "X-Worker-Allow": WORKER_PASS
        },
    });
    const { data } = await res.json();
    data['English Classes'] = data.classes.filter((c: any) => c.programId == 2).map((c: any) => c.name).join(', ');
    data.classes = data.classes.filter((c: any) => c.programId !== 2).map((c: any) => c.name).join(', ');

    const isNumericId = /^\d+$/.test(params.id_hash);
    if (!isNumericId) {
        return { requiresBirthday: false, student: data };
    }

    // Numeric ID — expect birthday from query param
    const input = url.searchParams.get("birthday"); // DD/MM/YYYY
    if (!input) {
        return { requiresBirthday: true, student: null, birthdayError: null };
    }

    const [dd, mm, yyyy] = input.split("/");
    const normalized = `${yyyy}-${mm}-${dd}`;

    if (normalized !== data.birthday) {
        return { requiresBirthday: true, student: null, birthdayError: "Birthday does not match. Please try again." };
    }

    const { birthday, ...safeStudent } = data;
    return { requiresBirthday: false, student: safeStudent };
};
