import { PUBLIC_PORTAL_API_KEY } from "$env/static/public";

export const load = async ({ params }) => {
    const query = new URLSearchParams({
        filterByTk: params.id,
        appends: 'enrollments,enrollments.program,picture,scholarshipSource,user,classes'
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
    if (data.picture)
        data.photo = 'https://portal.rua.edu.kh' + data.picture.url;
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