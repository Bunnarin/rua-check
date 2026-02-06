<script>
  export let data;
</script>

<svelte:head>
  <title>Certificate Details</title>
</svelte:head>

<div class="container result-card">
  <div class="card-header">
    <h2>Certificate Information</h2>
    <a href="/" class="back-link">
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
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span>Back to Search</span>
    </a>
  </div>

  <div class="table-container">
    <table>
      <tbody>
        {#each Object.entries(data) as [key, value]}
          {#if value && key !== "id"}
            <tr>
              <td class="label-cell"
                >{key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
                  .replace("image", "")}</td
              >
              <td class="value-cell">
                {#if typeof value === "string" && value.startsWith("http")}
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="external-link"
                  >
                    {value}
                  </a>
                {:else}
                  <span class="text-value">{value}</span>
                {/if}
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .result-card {
    margin-top: 2rem !important;
    padding: 0 !important;
    overflow: hidden;
    border: none !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
  }

  .card-header {
    padding: 1.5rem 2rem;
    background: #f8fdf8;
    border-bottom: 1px solid #edf2ed;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h2 {
    margin: 0;
    color: #1b5e20;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .back-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #2e7d32;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #1b5e20;
  }

  .table-container {
    padding: 1rem 1rem;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  td {
    padding: 1.25rem 1rem;
    border-bottom: 1px solid #f0f0f0;
  }

  tr:last-child td {
    border-bottom: none;
  }

  .label-cell {
    font-weight: 600;
    color: #555;
    font-size: 0.95rem;
    background-color: #fafafa;
    border-radius: 8px 0 0 8px;
  }

  .value-cell {
    font-size: 1rem;
    color: #333;
  }

  .external-link {
    color: #2e7d32;
    text-decoration: none;
    word-break: break-all;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .external-link:hover {
    border-bottom-color: #2e7d32;
  }

  .text-value {
    line-height: 1.5;
  }

  .icon {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 600px) {
    .card-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
      padding: 1.25rem;
    }

    .label-cell {
      padding-right: 0.5rem;
      font-size: 0.85rem;
      width: 50%;
    }

    .value-cell {
      font-size: 0.9rem;
      padding-left: 0.5rem;
    }

    tr {
      padding: 0.5rem 0;
    }
  }
</style>
