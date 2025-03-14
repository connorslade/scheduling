<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import { Pencil, Trash } from "@lucide/svelte";
  import { format_date_range } from "$lib/util/date";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import Markdown from "$lib/components/Markdown.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Button from "$lib/components/Button.svelte";

  let { data }: PageProps = $props();
  let { user, event, session } = data;

  let confirm_delete = $state(false);
</script>

<div class="mt-4">
  <a href={`/event/${event.slug}`}>← Back</a>
</div>

<div class="flex items-center justify-between">
  <Subtitle title={session.name} />
  {#if event.admin_user_id.includes(user.id)}
    <div class="flex space-x-4">
      <button
        class="cursor-pointer"
        title="Delete Event"
        onclick={() => (confirm_delete = true)}
      >
        <Trash size={18} strokeWidth={1.5} />
      </button>
      <a href={`/event/${event.slug}/${session.slug}/edit`} title="Edit Event">
        <Pencil size={18} strokeWidth={1.5} />
      </a>
    </div>
  {/if}
</div>

<Text class="text-sm text-gray-500 mb-4 -mt-2">
  {format_date_range(session.start_time, session.end_time, true)}
</Text>

<Markdown source={session.description} />

<Modal bind:show={confirm_delete}>
  <h3 class="text-xl font-semibold">Confirm Deletion</h3>
  <Text class="mb-4 mt-4">
    Do you really want to delete the {session.name} session? This action can't be
    reversed!
  </Text>

  <div class="grid grid-cols-2 gap-3">
    <form use:enhance method="post" class="w-full">
      <Button class="w-full" type="submit">Delete</Button>
    </form>
    <Button on_click={() => (confirm_delete = false)}>Cancel</Button>
  </div>
</Modal>
