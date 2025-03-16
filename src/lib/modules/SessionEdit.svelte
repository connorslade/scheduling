<script lang="ts">
  import { enhance } from "$app/forms";
  import { datetime_string } from "$lib/util/date";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import TextInput from "$lib/components/form/TextInput.svelte";
  import TextareaInput from "$lib/components/form/TextareaInput.svelte";
  import DatetimeInput from "$lib/components/form/DatetimeInput.svelte";
  import NumericInput from "$lib/components/form/NumericInput.svelte";
  import MarkdownInput from "$lib/components/form/MarkdownInput.svelte";

  let { session: _session, event } = $props();
  let session = $state(_session);
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

  <TextareaInput title="Brief" rows={2} bind:value={session.brief} />
  <MarkdownInput
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
