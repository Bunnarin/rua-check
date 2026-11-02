import { UMS_API_KEY, WORKER_PASS, MAX_ATTEMPTS, LOCKOUT_SECONDS } from "$env/static/private";
import { error } from "@sveltejs/kit";

export const ssr = true;

async function getRateLimit(kv: KVNamespace, ip: string, idHash: string) {
    const key = `rl:${ip}:${idHash}`;
    const raw = await kv.get(key);
    const attempts = raw ? parseInt(raw) : 0;
    return { attempts, key };
}

async function recordFailure(kv: KVNamespace, key: string, current: number) {
    await kv.put(key, String(current + 1), { expirationTtl: LOCKOUT_SECONDS });
}

export const load = async ({ params, url, request, platform }) => {
    const isNumericId = /^\d+$/.test(params.id_hash);

    // Only numeric IDs need the birthday gate
    const input = isNumericId ? url.searchParams.get("birthday") : null; // DD/MM/YYYY

    // If numeric ID with a birthday attempt, check rate limit first
    if (isNumericId && input) {
        const kv: KVNamespace | undefined = platform?.env?.RATE_LIMIT;
        if (kv) {
            const ip =
                request.headers.get("CF-Connecting-IP") ??
                request.headers.get("X-Forwarded-For") ??
                "unknown";

            const { attempts, key } = await getRateLimit(kv, ip, params.id_hash);

            if (attempts >= MAX_ATTEMPTS) {
                // Return locked state — don't even hit the origin
                return {
                    requiresBirthday: true,
                    student: null,
                    birthdayError: `Too many failed attempts. Please try again in ${LOCKOUT_SECONDS / 60} minutes.`,
                    locked: true,
                };
            }

            // Fetch student and verify birthday
            const student = await fetchStudent(params.id_hash);
            const [dd, mm, yyyy] = input.split("/");
            const normalized = `${yyyy}-${mm}-${dd}`;

            if (normalized !== student.birthday) {
                await recordFailure(kv, key, attempts);
                const remaining = MAX_ATTEMPTS - (attempts + 1);
                return {
                    requiresBirthday: true,
                    student: null,
                    birthdayError:
                        remaining > 0
                            ? `Birthday does not match. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
                            : `Too many failed attempts. Please try again in ${LOCKOUT_SECONDS / 60} minutes.`,
                    locked: remaining <= 0,
                };
            }

            // ✅ Correct — clear the rate limit key and return student
            await kv.delete(key);
            const { birthday, ...safeStudent } = student;
            return { requiresBirthday: false, student: safeStudent };
        }
    }

    // No KV bound (local dev) or non-numeric ID — fall through without rate limiting
    const data = await fetchStudent(params.id_hash);

    if (!isNumericId) {
        return { requiresBirthday: false, student: data };
    }

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

async function fetchStudent(idHash: string) {
    const query = new URLSearchParams({
        filter: JSON.stringify({ hashedId: idHash }),
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
    return data;
}
