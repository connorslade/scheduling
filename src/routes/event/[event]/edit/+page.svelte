<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import { date_string, datetime_string } from "$lib/util";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import TextInput from "$lib/components/form/TextInput.svelte";
  import TextareaInput from "$lib/components/form/TextareaInput.svelte";
  import DatetimeInput from "$lib/components/form/DatetimeInput.svelte";
  import Text from "$lib/components/Text.svelte";

  let { data }: PageProps = $props();
  let event = $state(data.event);
  let sessions = $state(data.sessions);

  let expanded: boolean[] = $state(new Array(sessions.length).fill(false));
</script>

<form method="post" use:enhance>
  <input type="hidden" name="id" value={event.id} />

  <div class="mt-4 flex justify-between">
    <a href={`/event/${event.slug}`}>← Discard</a>
    <input type="submit" value="Save →" class="cursor-pointer" />
  </div>

  <Subtitle title={`Editing ${event.name}`} />
  <Text class="mb-8">
    You need to manually click the save button on the top right to avoid losing
    any changes.
  </Text>

  <div class="grid grid-cols-2 gap-2">
    <TextInput title="Title" bind:value={event.name} />
    <TextInput title="Slug" bind:value={event.slug} />
  </div>

  <TextareaInput title="Brief" rows={2} bind:value={event.brief} />
  <TextareaInput title="Description" rows={8} bind:value={event.description} />

  <div class="grid grid-cols-2 gap-2">
    <DatetimeInput
      title="Start Time"
      time={false}
      value={date_string(event.start_date)}
    />
    <DatetimeInput
      title="End Time"
      time={false}
      value={date_string(event.end_date)}
    />
  </div>
</form>
