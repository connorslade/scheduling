<script lang="ts">
  import type { PageProps } from "./$types";
  import { Crown, Edit, Import, Pencil, Plus, Search } from "@lucide/svelte";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import { format_date_range } from "$lib/util";

  let { data }: PageProps = $props();
  let { user, event, sessions } = data;

  let upload_form: HTMLFormElement | null = $state(null);
  let upload: HTMLInputElement | null = $state(null);

  let search = $state("");
  let filtered_sessions = $derived(
    sessions.filter(
      (x) =>
        search == "" || x.name.toLowerCase().includes(search.toLowerCase()),
    ),
  );
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

<div class="flex items-center justify-between">
  <Subtitle title="Sessions" level={3} />
  {#if event.admin_user_id.includes(user.id)}
    <div class="flex space-x-2">
      <a href="/" title="New Session"><Plus size={20} strokeWidth={1.2} /></a>
      <form
        method="post"
        action="?/upload"
        bind:this={upload_form}
        enctype="multipart/form-data"
      >
        <input
          type="file"
          name="file"
          class="hidden"
          accept="text/csv"
          required
          bind:this={upload}
          onchange={() => upload_form?.submit()}
        />
      </form>
      <button
        class="cursor-pointer"
        title="Import CSV"
        onclick={() => upload?.click()}
      >
        <Import size={20} strokeWidth={1.2} />
      </button>
    </div>
  {/if}
</div>

<Search
  size={18}
  strokeWidth={1.5}
  class="absolute m-2"
  color="var(--color-gray-400)"
/>
<input
  class="mb-4 p-1 border border-gray-300 rounded-md w-full indent-7"
  type="text"
  bind:value={search}
  placeholder="Filter sessions..."
/>

{#each filtered_sessions as session, i}
  <div
    class="border-gray-200 pb-4 cursor-pointer"
    class:border-b={i !== filtered_sessions.length - 1}
  >
    <a href={`/event/${event.slug}/${session.slug}`}>
      <h3 class="text-xl font-semibold">{session.name}</h3>
      <Text class="text-sm">{session.description}</Text>
    </a>
  </div>
{/each}

{#if filtered_sessions.length == 0 && sessions.length > 0}
  <Text>No sessions matched the filter.</Text>
{/if}
