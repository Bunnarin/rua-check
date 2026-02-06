<script>
    import { goto } from "$app/navigation";

    let certId = "";

    function verify() {
        goto(`/${certId.trim()}`);
    }

    function handleKeydown(event) {
        if (event.key === "Enter") {
            verify();
        }
    }
</script>

<svelte:head>
    <title>Certificate Verification | CACU</title>
</svelte:head>

<div class="container verification-card">
    <div class="card-content">
        <h1>Certificate Verification</h1>
        <p class="subtitle">
            Enter your certification number to verify authenticity.
        </p>

        <div class="input-wrapper">
            <input
                type="text"
                bind:value={certId}
                on:keydown={handleKeydown}
                placeholder="Enter certification number (e.g., EP202602001)"
            />
            <button
                on:click={verify}
                disabled={!certId.trim()}
                class="verify-btn"
            >
                <span>Verify Certificate</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon"
                >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                </svg>
            </button>
        </div>

        <div id="result"></div>
    </div>
</div>

<style>
    .verification-card {
        margin-top: 1rem !important;
        padding: 3rem 2rem !important;
        text-align: center;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .verification-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 2rem;
        color: #1b5e20;
        margin-bottom: 0.5rem;
        font-weight: 700;
    }

    .subtitle {
        color: #666;
        margin-bottom: 2.5rem;
        font-size: 1.1rem;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        max-width: 450px;
        margin: 0 auto;
    }

    input {
        width: 100%;
        padding: 1rem 1.25rem;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        font-size: 1.1rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background-color: #fcfcfc;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #2e7d32;
        background-color: white;
        box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.1);
    }

    .verify-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .verify-btn:hover {
        filter: brightness(1.1);
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
    }

    .verify-btn:active {
        transform: scale(0.98);
    }

    .icon {
        width: 20px;
        height: 20px;
    }

    @media (max-width: 480px) {
        .verification-card {
            margin: 1.5rem !important;
            padding: 2rem 1.5rem !important;
        }

        h1 {
            font-size: 1.5rem;
        }
    }
</style>
