<script lang="ts">
  import type { PageProps } from "./$types";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import { format_date_range } from "$lib/util";

  let { data }: PageProps = $props();
  let { event, session } = data;
</script>

<div class="mt-4">
  <a href={`/event/${event.slug}`}>← Back</a>
</div>

<Subtitle title={session.name} />
<Text class="text-sm text-gray-500 mb-4 -mt-2">
  {format_date_range(session.start_time, session.end_time, true)}
</Text>

<Text>{session.description}</Text>
