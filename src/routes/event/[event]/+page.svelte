<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import { Import, Pencil, Plus, Search, Trash } from "@lucide/svelte";
  import { format_date_range } from "$lib/util/date";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import Markdown from "$lib/components/Markdown.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Button from "$lib/components/Button.svelte";

  let { data }: PageProps = $props();
  let { user, event, sessions } = data;

  let upload_form: HTMLFormElement | null = $state(null);
  let upload: HTMLInputElement | null = $state(null);
  let confirm_delete = $state(false);

  let search = $state("");
  let filtered_sessions = $derived.by(() => {
    let search_empty = search == "";
    let search_l = search.toLowerCase();
    return sessions
      .filter((x) => search_empty || x.name.toLowerCase().includes(search_l))
      .toSorted((a, b) => a.start_time.getTime() - b.start_time.getTime());
  });
</script>

<div class="mt-4">
  <a href="/events">← Back</a>
</div>

<div class="flex items-center justify-between">
  <Subtitle title={data.event.name} />
  {#if event.admin_user_id.includes(user.id)}
    <div class="flex space-x-4">
      <button
        class="cursor-pointer"
        title="Delete Event"
        onclick={() => (confirm_delete = true)}
      >
        <Trash size={18} strokeWidth={1.5} />
      </button>
      <a href={`/event/${event.slug}/edit`} title="Edit Event">
        <Pencil size={18} strokeWidth={1.5} />
      </a>
    </div>
  {/if}
</div>

{#if event.start_date || event.end_date}
  <Text class="text-sm text-gray-500 mb-4 -mt-2">
    {format_date_range(event.start_date, event.end_date)}
  </Text>
{/if}

<Markdown source={event.description} />

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
  {@const time = session.start_time.getTime()}
  {#if i == 0 || time != filtered_sessions[i - 1].start_time.getTime()}
    <Subtitle
      title={session.start_time.toLocaleTimeString(undefined, {
        timeStyle: "short",
      })}
      level={4}
    />
  {/if}

  <div
    class="border-gray-200 pb-4 mt-2 cursor-pointer"
    class:border-b={i !== filtered_sessions.length - 1 &&
      time == filtered_sessions[i + 1].start_time.getTime()}
  >
    <a href={`/event/${event.slug}/${session.slug}`}>
      <h3 class="text-xl font-semibold">{session.name}</h3>
      <Text class="text-sm">{session.brief}</Text>
    </a>
  </div>
{/each}

{#if filtered_sessions.length == 0 && sessions.length > 0}
  <Text>No sessions matched the filter.</Text>
{/if}

<Modal bind:show={confirm_delete}>
  <h3 class="text-xl font-semibold">Confirm Deletion</h3>
  <Text class="mb-4 mt-4">
    Do you really want to delete the {event.name} event? This action can't be reversed!
  </Text>

  <div class="grid grid-cols-2 gap-3">
    <form use:enhance method="post" action="?/delete" class="w-full">
      <Button class="w-full" type="submit">Delete</Button>
    </form>
    <Button on_click={() => (confirm_delete = false)}>Cancel</Button>
  </div>
</Modal>
