import { PUBLIC_PORTAL_API_KEY } from "$env/static/public";

export const load = async ({ params }) => {
    const query = new URLSearchParams({
        filterByTk: params.id,
        appends: 'enrollments,enrollments.program,picture,user,classes'
    });
    const res = await fetch(`https://rua.popok.uk/api/student:get?${query}`, {
        headers: {
            "Authorization": `Bearer ${PUBLIC_PORTAL_API_KEY}`
        },
    });
    const { data } = await res.json();
    // inject our own
    data.phone = data.user?.phone;
    if (data.picture)
        data.photo = 'https://rua.popok.uk' + data.picture.url;
    data.classes = data.classes.map((c) => c.name).join(', ');
    const fieldsToHide = ['highschoolType', 'bacIIYear', 'bacIIGrade', 'noNationalIdYet', 'bacIICertificateID', 'nationalID', 'bacIIGrade'];
    // bassically hide anything that ends with 'Id'
    for (const key in data) {
        if (key.endsWith('Id'))
            fieldsToHide.push(key);
    }
    fieldsToHide.forEach(field => delete data[field]);
    return data;
};