<script lang="ts">
  import type { PageProps } from "./$types";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import { format_date_range } from "$lib/util/date";
  import { Pencil } from "@lucide/svelte";

  let { data }: PageProps = $props();
  let { user, event, session } = data;
</script>

<div class="mt-4">
  <a href={`/event/${event.slug}`}>← Back</a>
</div>

<div class="flex items-center justify-between">
  <Subtitle title={session.name} />
  {#if event.admin_user_id.includes(user.id)}
    <a href={`/event/${event.slug}/${session.slug}/edit`} title="Edit Event">
      <Pencil size={18} strokeWidth={1.5} />
    </a>
  {/if}
</div>

<Text class="text-sm text-gray-500 mb-4 -mt-2">
  {format_date_range(session.start_time, session.end_time, true)}
</Text>

<Text>{session.description}</Text>
