<script lang="ts">
  import type { PageProps } from "./$types";
  import { Crown } from "@lucide/svelte";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import { format_date_range } from "$lib/util/date";

  let { data }: PageProps = $props();
  let { user, events } = data;
</script>

<Subtitle title="Events" level={2} />

{#if events.length == 0}
  <Text>No events yet...</Text>
{/if}

<div class="mt-6 space-y-4">
  {#each events as event, i}
    <div
      class="border-gray-200 pb-4 cursor-pointer"
      class:border-b={i !== events.length - 1}
    >
      <a href={`/event/${event.slug}`}>
        <div class="flex items-baseline justify-between gap-2">
          <div class="flex items-center space-x-2">
            <h3 class="text-xl font-semibold">{event.name}</h3>
            {#if user !== null && event.admin_user_id.includes(user.id)}
              <Crown size={18} />
            {/if}
          </div>
          <p class="text-sm text-gray-500">
            {format_date_range(event.start_date, event.end_date)}
          </p>
        </div>
        <Text class="text-sm">{event.brief}</Text>
      </a>
    </div>
  {/each}
</div>
