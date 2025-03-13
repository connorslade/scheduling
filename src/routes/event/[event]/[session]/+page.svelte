<script lang="ts">
  import type { PageProps } from "./$types";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import { ArrowLeft } from "@lucide/svelte";

  let { data }: PageProps = $props();
  let { event, session } = data;
</script>

<div class="mt-4">
  <a href={`/event/${event.slug}`}>← Back</a>
</div>

<Subtitle title={session.name} />
<Text>{session.description}</Text>
