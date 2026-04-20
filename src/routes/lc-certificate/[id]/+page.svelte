<script>
  export let data;
</script>

<div class="page-wrapper">
  <div class="container main-content">
    <div class="details-section">
      <div class="section-card shadow-soft">
        <div class="card-header">
          <div class="card-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              /><polyline points="14 2 14 8 20 8" /><line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
              /><line x1="16" y1="17" x2="8" y2="17" /><polyline
                points="10 9 9 9 8 9"
              />
            </svg>
            <h2>Validation Details</h2>
          </div>
        </div>
        <div class="info-grid">
          {#each Object.entries(data) as [key, value]}
            <div class="info-item">
              <label class="info-label">{key}</label>
              <div class="info-value">
                <span class="text-data">{value}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family:
      "Inter",
      system-ui,
      -apple-system,
      sans-serif;
    background-color: #f0f4f8;
    color: #1e293b;
  }

  .page-wrapper {
    min-height: 100vh;
    padding: 3rem 1rem;
    background-image: radial-gradient(
        at 10% 20%,
        rgba(30, 41, 59, 0.03) 0px,
        transparent 50%
      ),
      radial-gradient(at 90% 80%, rgba(15, 23, 42, 0.03) 0px, transparent 50%);
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  /* Details Card */
  .section-card {
    background: white;
    border-radius: 2rem;
    padding: 3rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.03);
  }

  .card-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
    color: #1e293b;
  }

  .card-title h2 {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
  }

  .card-title svg {
    color: #64748b;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem 2rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .info-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
  }

  .info-value {
    font-size: 1rem;
    font-weight: 600;
    color: #334155;
    line-height: 1.5;
  }

  .text-data {
    word-break: break-all;
  }

  .shadow-soft {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
  }

  /* Mobile Responsive */
  @media (max-width: 640px) {
    .info-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .section-card {
      padding: 2rem 1.5rem;
    }

    .page-wrapper {
      padding: 1.5rem 1rem;
    }
  }
</style>
