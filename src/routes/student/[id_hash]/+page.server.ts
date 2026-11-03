import { UMS_API_KEY, WORKER_PASS, NAME_MATCH_THRESHOLD } from "$env/static/private";

export const ssr = true;

const normalize = (s: string) => s.toUpperCase().trim().replace(/\s+/g, " ");

function editDistance(s1: string, s2: string): number {
    const costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) costs[j] = j;
            else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                    newValue = Math.min(newValue, lastValue, costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function getSimilarity(s1: string, s2: string): number {
    if (!s1 || !s2) return 0; // Don't match empty names
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    return (longer.length - editDistance(longer, shorter)) / longer.length;
}

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

    // Numeric ID: expect English name from query param
    const input = url.searchParams.get("englishName");
    if (!input) {
        return { requiresBirthday: true, student: null, birthdayError: null, enteredName: "" };
    }

    const score = getSimilarity(normalize(input), normalize(data.englishName ?? ""));

    if (score < NAME_MATCH_THRESHOLD) {
        return {
            requiresBirthday: true,
            student: null,
            birthdayError: "Name does not match. Please try again.",
            enteredName: input,
        };
    }

    const { birthday, ...safeStudent } = data;
    return { requiresBirthday: false, student: safeStudent };
};