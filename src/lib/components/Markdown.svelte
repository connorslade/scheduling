<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";

  let { source } = $props();
</script>

<article class="rendered">
  <SvelteMarkdown {source} />
</article>
