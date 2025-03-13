<script lang="ts">
  let { title, level = 2 } = $props();

  let id = title.toLowerCase().replace(/\s/g, "-");
</script>

{#if level == 2}
  <h2 class="text-4xl font-light mt-4 mb-4" {id}>{title}</h2>
{:else if level == 3}
  <h3 class="text-3xl font-light mt-4 mb-4" {id}>{title}</h3>
{/if}
