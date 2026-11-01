<script>
    export let data;
    const excludeKeys = ["id", "englishName", "khmerName"];
    const details = Object.entries(data).filter(
        ([key, value]) =>
            value && typeof value !== "object" && !excludeKeys.includes(key),
    );

    // student will call this alot of time, so I don't want to append enrollments.program
    const programs = [
        { khmerName: "វិទ្យាសាស្រ្តជលផល", id: 3 },
        { khmerName: "វិទ្យាសាស្រ្តសត្វ", id: 4 },
        { khmerName: "រៀបចំដែនដី និងរដ្ឋបាលដីធ្លី", id: 5 },
        { khmerName: "វេជ្ជសាស្រ្តសត្វ", id: 6 },
        { khmerName: "អាហារ និងវិទ្យាសាស្រ្តអាហារូបត្ថម្ភ", id: 8 },
        { khmerName: "វិទ្យាសាស្រ្តអាហារនិងបច្ចេកវិទ្យាក្រោយប្រមូលផល", id: 9 },
        { khmerName: "វិទ្យាសាស្រ្តកសិកម្ម", id: 10 },
        { khmerName: "វិស្វកម្មប្រព័ន្ធជីវកសិកម្ម", id: 11 },
        { khmerName: "ព្រៃឈើ និងធនធានធម្មជាតិ", id: 13 },
        { khmerName: "សាកវប្បកម្ម", id: 14 },
        { khmerName: "ផលិតកម្មសត្វ", id: 15 },
        { khmerName: "បច្ចេកទេសក្រោយពេលប្រមូលផល និងកែច្នៃអាហារ", id: 16 },
        { khmerName: "បច្ចេកវិទ្យាជួសជុលថែទាំបរិក្ខារឧស្សាហកម្ម", id: 17 },
        { khmerName: "រដ្ឋបាលពាណិជ្ជកម្ម", id: 18 },
        { khmerName: "បសុវេជ្ជបណ្ឌិត", id: 19 },
        { khmerName: "អប់រំ​និង​ផ្សព្វ​ផ្សាយ​កសិកម្ម​", id: 21 },
        { khmerName: "វិទ្យាសាស្ត្រដំណាំ", id: 22 },
        { khmerName: "វិទ្យាសាស្ត្រកសិកម្ម (រង)", id: 24 },
        { khmerName: "គ្រប់គ្រងកសិធុរកិច្ច និងសហគ្រិនភាព", id: 26 },
        { khmerName: "សេដ្ឋកិច្ច និងគ្រប់គ្រង", id: 27 },
        { khmerName: "កសិអេកូឡូស៊ី និងប្រព័ន្ឋស្បៀងអារហារ", id: 28 },
        { khmerName: "សេដ្ឋកិច្ច និងគ្រប់គ្រងការអភិវឌ្ឍន៍", id: 29 },
        {
            khmerName: "ការគ្រប់គ្រងចម្រុះសម្រាប់ការអភិវឌ្ឍកសិកម្មនិងជនបទ",
            id: 30,
        },
        { khmerName: "ការគ្រប់គ្រងធនធានធម្មជាតិ​", id: 31 },
        { khmerName: "ការផ្សព្វផ្សាយកសិកម្ម (បរិញ្ញាបត្រជាន់ខ្ពស់)", id: 32 },
        {
            khmerName: "ការប្រែប្រួលអាកាសធាតុ  និងការអភិវឌ្ឍន៍ប្រកបដោយចីរភាព",
            id: 34,
        },
        { khmerName: "សេដ្ឋកិច្ច និងគ្រប់គ្រងការអភិវឌ្ឍន៍ (បណ្ឌិត)", id: 35 },
        { khmerName: "ផែនការអភិវឌ្ឍន៍តំបន់ និងទីក្រុង", id: 36 },
        { khmerName: "វិស្វកម្មប្រព័ន្ធជីវកសិកម្ម (ជាន់ខ្ពស់)", id: 37 },
        { khmerName: "វិទ្យាសាស្ត្រសត្វ (ជាន់ខ្ពស់)", id: 38 },
        { khmerName: "បច្ចេកវិទ្យានិងវិទ្យាសាស្រ្តអាហារ", id: 39 },
        { khmerName: "វិទ្យាសាស្រ្តកសិកម្ម (បណ្ឌិត)", id: 40 },
        { khmerName: "ផែនការអភិវឌ្ឍន៍តំបន់ និងទីក្រុង (បណ្ឌិត)", id: 41 },
        { khmerName: "វេជ្ជសាស្រ្តសត្វ (បណ្ឌិត)", id: 42 },
    ];

    const majorTags = data.enrollments
        .filter((e) => !e.dropoutDate)
        .map((e) => {
            let tag = programs.find((p) => p.id == e.programId).khmerName;
            if (e.graduationDate) tag += "(បានបញ្ចប់ការសិក្សា)";
            else if (e.year) tag += ` (ឆ្នាំ${e.year})`;
            if (e.generation) tag += ` ជំនាន់ទី ${e.generation}`;
            return tag;
        });
</script>

<div class="school-logo-container" style="text-align: center;">
    <img
        src="/logo.png"
        alt="School Logo"
        class="school-logo"
        style="width:8rem"
    />
</div>
<!-- Profile Hero Section -->
<header class="profile-hero shadow-premium">
    <div class="hero-content">
        <!-- <div class="avatar-wrapper shadow-soft">
            {#if data.pictureURL}
                <img src={data.pictureURL} alt={data.englishName} class="avatar" />
            {:else}
                <div class="avatar-placeholder">
                    {data.khmerName.charAt(0)}
                </div>
            {/if}
        </div> -->
        <div class="student-info">
            <h1 class="student-name">
                {data.khmerName}
                {data.englishName}
            </h1>
            <div class="meta-tags">
                <span class="id-tag">
                    <span class="tag-label">ID:</span>
                    {data.id}
                </span>
                {#each majorTags as majorTag}
                    <span class="major-tag">{majorTag}</span>
                {/each}
            </div>
        </div>
    </div>
</header>

<!-- Details Grid -->
<div class="details-section">
    <div class="section-card shadow-soft">
        <div class="info-grid">
            {#each details as [key, value]}
                <div class="info-item">
                    <label class="info-label"
                        >{key.replace(/([A-Z])/g, " $1")}</label
                    >
                    <div class="info-value">
                        {value}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: "Khmer OS Battambang", sans-serif;
        background-color: #f8fafc;
        color: #1e293b;
    }

    @keyframes pulse {
        0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
        }
        70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
        }
        100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
        }
    }

    /* Hero Section */
    .profile-hero {
        position: relative;
        background: white;
        border-radius: 1.5rem;
        overflow: hidden;
        margin-bottom: 2rem;
        border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .hero-content {
        padding: 0 2.5rem 2.5rem;
        margin-top: 20px;
        display: flex;
        align-items: flex-end;
        gap: 2rem;
        position: relative;
        z-index: 10;
    }

    .avatar-wrapper {
        width: 140px;
        height: 140px;
        border-radius: 1.25rem;
        border: 4px solid white;
        background: #f1f5f9;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .avatar {
        width: 69%;
        height: 100%;
        object-fit: cover;
    }

    .avatar-placeholder {
        font-size: 3rem;
        font-weight: 700;
        color: #94a3b8;
    }

    .student-info {
        padding-bottom: 0.5rem;
    }

    .student-name {
        margin: 0 0 0.75rem 0;
        font-size: 2rem;
        font-weight: 800;
        color: #0f172a;
        letter-spacing: -0.02em;
    }

    .meta-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .id-tag,
    .major-tag {
        font-size: 0.8125rem;
        font-weight: 600;
        padding: 0.4rem 0.8rem;
        border-radius: 0.625rem;
    }

    .id-tag {
        background: #f1f5f9;
        color: #475569;
    }

    .tag-label {
        opacity: 0.6;
        margin-right: 0.25rem;
    }

    .major-tag {
        background: #ecfdf5;
        color: #059669;
    }

    /* Details Card */
    .section-card {
        background: white;
        border-radius: 1.5rem;
        padding: 2.5rem;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .info-label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #64748b;
    }

    .info-value {
        font-weight: 500;
        color: #334155;
        line-height: 1.5;
    }

    /* Utilities */
    .shadow-premium {
        box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.05),
            0 10px 10px -5px rgba(0, 0, 0, 0.02);
    }

    .shadow-soft {
        box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.05),
            0 2px 4px -1px rgba(0, 0, 0, 0.01);
    }

    /* Mobile Responsive */
    @media (max-width: 640px) {
        .hero-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 1.5rem 2rem;
        }

        .avatar-wrapper {
            width: 120px;
            height: 120px;
        }

        .student-name {
            font-size: 1.5rem;
        }

        .meta-tags {
            justify-content: center;
        }

        .info-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .section-card {
            padding: 1.5rem;
        }
    }
</style>
