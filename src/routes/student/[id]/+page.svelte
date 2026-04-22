<script>
    export let data;
    // Filter out fields for the main details section to avoid duplicates
    const excludeKeys = ["id", "picture", "englishName", "khmerName", "majors"];
    const details = Object.entries(data).filter(
        ([key, value]) =>
            value && typeof value !== "object" && !excludeKeys.includes(key),
    );
</script>

<div class="page-wrapper">
    <div class="container main-content">
        <div class="school-logo-container" style="text-align: center;">
            <img src="/logo.png" alt="School Logo" class="school-logo" />
        </div>
        <!-- Profile Hero Section -->
        <header class="profile-hero shadow-premium">
            <div class="hero-content">
                <div class="avatar-wrapper shadow-soft">
                    {#if data.picture}
                        <img
                            src={data.picture.url}
                            alt={data.englishName}
                            class="avatar"
                        />
                    {:else}
                        <div class="avatar-placeholder">
                            {data.khmerName.charAt(0)}
                        </div>
                    {/if}
                </div>
                <div class="student-info">
                    <h1 class="student-name">{data.khmerName}</h1>
                    <div class="meta-tags">
                        <span class="id-tag">
                            <span class="tag-label">ID:</span>
                            {data.id}
                        </span>
                        {#each data.majors as major}
                            <span class="major-tag">{major.khmerName}</span>
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
                                {#if typeof value === "string" && (value.startsWith("http") || value.includes("@"))}
                                    <a
                                        href={value.startsWith("http")
                                            ? value
                                            : `mailto:${value}`}
                                        target={value.startsWith("http")
                                            ? "_blank"
                                            : "_self"}
                                        rel="noopener noreferrer"
                                        class="data-link"
                                    >
                                        {value}
                                        {#if value.startsWith("http")}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path
                                                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                                /><polyline
                                                    points="15 3 21 3 21 9"
                                                /><line
                                                    x1="10"
                                                    y1="14"
                                                    x2="21"
                                                    y2="3"
                                                />
                                            </svg>
                                        {/if}
                                    </a>
                                {:else if typeof value === "object" && value !== null}
                                    <span class="text-data"
                                        >{value.name ||
                                            JSON.stringify(value)}</span
                                    >
                                {:else}
                                    <span class="text-data">{value}</span>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="info-footer">
                Data retrieved from RUA Portal System. Information is current as
                of today.
            </div>
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

    .page-wrapper {
        min-height: 100vh;
        padding: 2rem 1rem;
        background-image: radial-gradient(
                at 0% 0%,
                rgba(34, 197, 94, 0.05) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 100% 100%,
                rgba(21, 128, 61, 0.05) 0px,
                transparent 50%
            );
    }

    .container {
        max-width: 900px;
        margin: 0 auto;
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
        width: 100%;
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

    .text-data {
        word-break: break-all;
    }

    .data-link {
        color: #15803d;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        word-break: break-all;
        border-bottom: 1px solid transparent;
        transition: border-color 0.2s;
    }

    /* Footer */
    .info-footer {
        text-align: center;
        padding: 1rem 0;
        color: #64748b;
        font-size: 0.8125rem;
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

        .page-wrapper {
            padding: 1rem;
        }
    }
</style>
