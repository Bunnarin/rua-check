import { PUBLIC_PORTAL_API_KEY } from "$env/static/public";

export const load = async ({ params }) => {
    const query = new URLSearchParams({
        filterByTk: params.id,
        appends: 'majors,picture,scholarshipSource,user'
    });
    const res = await fetch(`https://portal.rua.edu.kh/api/student:get?${query}`, {
        headers: {
            "Authorization": `Bearer ${PUBLIC_PORTAL_API_KEY}`
        },
    });
    const { data } = await res.json();
    // inject our own
    if (data.scholarshipSourceId)
        data.scholarship = data.scholarshipSource?.name + `(${data.scholarshipCoverage}%)`;
    data.phone = data.user?.phone;
    data.email = data.user?.email;
    data.photo = 'https://portal.rua.edu.kh' + data.picture.url;
    const fieldsToHide = ['shift', 'createdAt', 'status', 'oldId', 'fyId', 'balance', 'validTil', 'validTilSemester', 'photoURL', 'scholarshipCoverage', 'userId', 'backgroundId', 'scholarshipSourceId'];
    fieldsToHide.forEach(field => delete data[field]);
    return data;
};