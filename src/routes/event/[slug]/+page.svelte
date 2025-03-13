<script lang="ts">
  import type { PageProps } from "./$types";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";

  let { data }: PageProps = $props();
  let event = data.event;
</script>

<Subtitle title={data.event.name} />
{#if event.start_date || event.end_date}
  <Text>{event.start_date ?? ""}-{event.end_date ?? ""}</Text>
{/if}

<Text>{event.description}</Text>

<Subtitle title="Sessions" level={3} />
