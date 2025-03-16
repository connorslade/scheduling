<script lang="ts">
  import EventEdit from "$lib/modules/EventEdit.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<EventEdit event={data.event} />
