<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import { datetime_string, format_date_range } from "$lib/util/date";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import TextInput from "$lib/components/form/TextInput.svelte";
  import TextareaInput from "$lib/components/form/TextareaInput.svelte";
  import DatetimeInput from "$lib/components/form/DatetimeInput.svelte";
  import NumericInput from "$lib/components/form/NumericInput.svelte";

  let { data }: PageProps = $props();
  let event = data.event;
  let session = $state(data.session);
</script>

<form method="post" use:enhance>
  <input type="hidden" name="id" value={session.id} />

  <div class="mt-4 flex justify-between">
    <a href={`/event/${event.slug}/${session.slug}`}>← Discard</a>
    <input type="submit" value="Save →" class="cursor-pointer" />
  </div>

  <Subtitle title={`Editing ${session.name}`} />

  <div class="grid grid-cols-2 gap-2">
    <TextInput title="Title" bind:value={session.name} />
    <TextInput title="Slug" bind:value={session.slug} />
  </div>

  <TextareaInput
    title="Description"
    rows={4}
    bind:value={session.description}
  />

  <div class="grid grid-cols-2 gap-2">
    <DatetimeInput
      title="Start Time"
      value={datetime_string(session.start_time)}
    />
    <DatetimeInput title="End Time" value={datetime_string(session.end_time)} />
  </div>

  <NumericInput title="Capacity" bind:value={session.capacity} />
</form>
