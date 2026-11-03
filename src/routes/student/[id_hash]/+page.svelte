<script lang="ts">
    export let data;

    $: student = data.student;
    $: verified = !data.requiresBirthday;

    // Name gate input
    let nameInput = data.enteredName ?? "";
    $: canSubmit = nameInput.trim().length > 0;

    // --- Student display logic (same as before) ---
    const excludeKeys = ["id", "englishName", "khmerName"];
    $: details = Object.entries(student ?? {}).filter(
        ([key, value]) =>
            value && typeof value !== "object" && !excludeKeys.includes(key),
    );

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

    $: majorTags = (student?.enrollments ?? [])
        .filter((e: any) => !e.dropoutDate)
        .map((e: any) => {
            let tag =
                programs.find((p) => p.id == e.programId)?.khmerName ?? "";
            if (e.graduationDate) tag += "(បានបញ្ចប់ការសិក្សា)";
            else if (e.year) tag += ` (ឆ្នាំ${e.year})`;
            if (e.generation) tag += ` ជំនាន់${e.generation}`;
            return tag;
        });
</script>

<div class="page-container">
    <div class="school-logo-container">
        <img src="/logo.png" alt="School Logo" class="school-logo" />
    </div>

    {#if !verified}
        <!-- Name Gate -->
        <div class="gate-wrapper">
            <div class="gate-card shadow-premium">
                <div class="gate-icon">🔐</div>
                <h2 class="gate-title">សូមបញ្ចូលឈ្មោះជាអក្សរឡាតាំង</h2>
                <p class="gate-subtitle">Enter your English name</p>

                <form method="GET">
                    <input
                        class="name-input"
                        type="text"
                        name="englishName"
                        bind:value={nameInput}
                        placeholder="e.g. SOK SAMNANG"
                        autocomplete="off"
                        autocapitalize="characters"
                        spellcheck="false"
                    />

                    {#if data.birthdayError}
                        <div class="gate-error">
                            <span class="error-icon">⚠️</span>
                            {data.birthdayError}
                        </div>
                    {/if}

                    <button
                        class="gate-btn"
                        type="submit"
                        disabled={!canSubmit}
                    >
                        បញ្ជាក់
                    </button>
                </form>
            </div>
        </div>
    {:else}
        <!-- Profile Hero Section -->
        <header class="profile-hero shadow-premium">
            <div class="hero-accent"></div>
            <div class="hero-content">
                <div class="student-info">
                    <h1 class="student-name">
                        {student.khmerName}
                        <span class="english-name">{student.englishName}</span>
                    </h1>
                    <div class="meta-tags">
                        <span class="id-tag">
                            <span class="tag-label">ID</span>
                            {student.id}
                        </span>
                        {#each majorTags as majorTag}
                            <span class="major-tag">{majorTag}</span>
                        {/each}
                    </div>
                </div>
            </div>
        </header>

        <!-- Details Grid -->
        <div class="section-card shadow-soft">
            <div class="info-grid">
                {#each details as [key, value]}
                    <div class="info-item">
                        <label class="info-label"
                            >{key.replace(/([A-Z])/g, " $1")}</label
                        >
                        <div class="info-value">{value}</div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        font-family: "Khmer OS Battambang", sans-serif;
        background-color: #f0f4f8;
        color: #1e293b;
    }

    /* ── Page wrapper ── */
    .page-container {
        max-width: 680px;
        margin: 0 auto;
        padding: 1.25rem 1rem 2rem;
    }

    /* ── Logo ── */
    .school-logo-container {
        text-align: center;
        margin-bottom: 1.25rem;
    }
    .school-logo {
        width: 5rem;
    }

    /* ── Birthday Gate ── */
    .gate-wrapper {
        display: flex;
        justify-content: center;
        padding-top: 1rem;
    }

    .gate-card {
        background: white;
        border-radius: 1.75rem;
        padding: 2.25rem 1.75rem 2rem;
        text-align: center;
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.06);
    }

    .gate-icon {
        font-size: 2.75rem;
        margin-bottom: 0.5rem;
        line-height: 1;
    }

    .gate-title {
        margin: 0 0 0.3rem;
        font-size: 1.2rem;
        font-weight: 700;
        color: #0f172a;
    }

    .gate-subtitle {
        margin: 0 0 1.75rem;
        font-size: 0.8rem;
        color: #94a3b8;
        letter-spacing: 0.12em;
    }
    .name-input {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1.1rem;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border: 2px solid #d0d5dd;
        border-radius: 10px;
    }

    .gate-error {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        color: #dc2626;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 0.625rem;
        font-size: 0.85rem;
        padding: 0.6rem 0.875rem;
        margin: 0 0 1rem;
    }

    .gate-btn {
        width: 100%;
        padding: 0.9rem;
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        color: white;
        border: none;
        border-radius: 0.875rem;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        font-family: inherit;
        letter-spacing: 0.03em;
        transition:
            opacity 0.15s,
            transform 0.1s;
        box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
    }

    .gate-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        box-shadow: none;
    }

    .gate-btn:not(:disabled):active {
        transform: scale(0.98);
    }

    /* ── Profile Hero ── */
    .profile-hero {
        position: relative;
        background: white;
        border-radius: 1.5rem;
        overflow: hidden;
        margin-bottom: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .hero-accent {
        height: 6px;
        background: linear-gradient(90deg, #059669, #34d399);
    }

    .hero-content {
        padding: 1.5rem 1.75rem 1.75rem;
    }

    .student-name {
        margin: 0 0 0.75rem 0;
        font-size: 1.6rem;
        font-weight: 800;
        color: #0f172a;
        line-height: 1.3;
    }

    .english-name {
        display: block;
        font-size: 1rem;
        font-weight: 500;
        color: #64748b;
        margin-top: 0.2rem;
    }

    .meta-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .id-tag,
    .major-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 0.35rem 0.75rem;
        border-radius: 999px;
    }

    .id-tag {
        background: #f1f5f9;
        color: #475569;
        border: 1px solid #e2e8f0;
    }

    .tag-label {
        opacity: 0.55;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .major-tag {
        background: #ecfdf5;
        color: #047857;
        border: 1px solid #a7f3d0;
    }

    /* ── Details card ── */
    .section-card {
        background: white;
        border-radius: 1.5rem;
        padding: 1.75rem;
        border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem 2rem;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .info-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: #94a3b8;
    }

    .info-value {
        font-weight: 600;
        color: #1e293b;
        line-height: 1.5;
        font-size: 0.95rem;
    }

    .shadow-premium {
        box-shadow:
            0 10px 30px -5px rgba(0, 0, 0, 0.08),
            0 4px 8px -2px rgba(0, 0, 0, 0.03);
    }

    .shadow-soft {
        box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.04),
            0 2px 4px -1px rgba(0, 0, 0, 0.02);
    }

    @media (max-width: 400px) {
        .info-grid {
            grid-template-columns: 1fr;
        }
        .student-name {
            font-size: 1.3rem;
        }
    }
</style>
