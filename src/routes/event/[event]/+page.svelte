<script lang="ts">
  import type { PageProps } from "./$types";
  import { Crown, Edit, Pencil } from "@lucide/svelte";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import { format_date_range } from "$lib/util";

  let { data }: PageProps = $props();
  let { user, event, sessions } = data;
</script>

<div class="mt-4">
  <a href="/events">← Back</a>
</div>

<div class="flex items-center justify-between">
  <Subtitle title={data.event.name} />
  {#if event.admin_user_id.includes(user.id)}
    <a href={`/event/${event.slug}/edit`} title="Edit Event">
      <Pencil size={18} strokeWidth={1.5} />
    </a>
  {/if}
</div>

{#if event.start_date || event.end_date}
  <Text class="text-sm text-gray-500 mb-4 -mt-2">
    {format_date_range(event.start_date, event.end_date)}
  </Text>
{/if}

<Text>{event.description}</Text>

<Subtitle title="Sessions" level={3} />

{#each sessions as session, i}
  <div
    class="border-gray-200 pb-4 cursor-pointer"
    class:border-b={i !== sessions.length - 1}
  >
    <a href={`/event/${event.slug}/${session.slug}`}>
      <h3 class="text-xl font-semibold">{session.name}</h3>
      <Text class="text-sm">{session.description}</Text>
    </a>
  </div>
{/each}
