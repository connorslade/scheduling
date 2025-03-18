<script lang="ts">
  import { enhance } from "$app/forms";
  import { date_string } from "$lib/util/date";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import TextInput from "$lib/components/form/TextInput.svelte";
  import TextareaInput from "$lib/components/form/TextareaInput.svelte";
  import DatetimeInput from "$lib/components/form/DatetimeInput.svelte";
  import Text from "$lib/components/Text.svelte";
  import MarkdownInput from "$lib/components/form/MarkdownInput.svelte";

  let {
    event: _event,
    back = `/event/${_event.slug}`,
    prefix = "Editing",
  } = $props();
  let event = $state(_event);
</script>

<form method="post" use:enhance>
  <input type="hidden" name="id" value={event.id} />

  <div class="mt-4 flex justify-between">
    <a href={back}>← Discard</a>
    <input type="submit" value="Save →" class="cursor-pointer" />
  </div>

  <Subtitle title="{prefix} {event.name}" />
  <Text class="mb-8">
    You need to manually click the save button on the top right to avoid losing
    any changes.
  </Text>

  <div class="grid grid-cols-2 gap-2">
    <TextInput title="Title" name="name" bind:value={event.name} />
    <TextInput title="Slug" bind:value={event.slug} />
  </div>

  <TextareaInput title="Brief" rows={2} bind:value={event.brief} />
  <MarkdownInput title="Description" rows={8} bind:value={event.description} />

  <div class="grid grid-cols-2 gap-2">
    <DatetimeInput
      title="Start Time"
      name="start_date"
      time={false}
      value={date_string(event.start_date)}
    />
    <DatetimeInput
      title="End Time"
      name="end_date"
      time={false}
      value={date_string(event.end_date)}
    />
  </div>
</form>
