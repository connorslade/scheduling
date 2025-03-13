<script lang="ts">
  import type { PageProps } from "./$types";
  import { ChevronRight, Plus, Trash } from "@lucide/svelte";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import TextInput from "$lib/components/form/TextInput.svelte";
  import TextareaInput from "$lib/components/form/TextareaInput.svelte";
  import DatetimeInput from "$lib/components/form/DatetimeInput.svelte";
  import Text from "$lib/components/Text.svelte";
  import NumericInput from "$lib/components/form/NumericInput.svelte";
  import { date_string, datetime_string } from "$lib/util";

  let { data }: PageProps = $props();
  let event = $state(data.event);
  let sessions = $state(data.sessions);

  let expanded: boolean[] = $state(new Array(sessions.length).fill(false));
</script>

<form method="post">
  <input type="hidden" name="id" value={event.id} />

  <div class="mt-4 flex justify-between">
    <a href={`/event/${event.slug}`}>← Discard</a>
    <input type="submit" value="Save →" class="cursor-pointer" />
  </div>

  <Subtitle title={`Editing ${event.name}`} />
  <Text>
    You need to manually click the save button on the top right to avoid losing
    any changes.
  </Text>

  <Subtitle title="Overview" level={3} />

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

  <div class="flex justify-between items-center">
    <Subtitle title="Sessions" level={3} />
    <button
      type="button"
      onclick={() => {
        let now = new Date();
        now.setMilliseconds(0);
        now.setSeconds(0);

        expanded.unshift(true);
        sessions.unshift({
          id: crypto.randomUUID(),
          slug: "new-session",
          name: "New Session",
          description: "",
          event_id: event.id,
          capacity: null,
          start_time: now,
          end_time: now,
        });
      }}
    >
      <Plus
        size={24}
        strokeWidth={1.5}
        class="hover:bg-gray-200 rounded-full cursor-pointer"
      />
    </button>
  </div>

  {#each sessions as session, i}
    {@const prefix = `session-${session.id}`}
    <div>
      <button
        type="button"
        class="flex items-center space-x-2 cursor-pointer mb-4"
        onclick={() => (expanded[i] = !expanded[i])}
      >
        <ChevronRight
          size={16}
          class="transition-transform {expanded[i]
            ? 'transform rotate-90'
            : ''}"
        />
        <h3 class="text-xl font-semibold">{session.name}</h3>
      </button>
      <div
        class="ml-6 pl-4 border-l border-gray-200 {expanded[i] ? '' : 'hidden'}"
      >
        <div class="grid grid-cols-2 gap-2">
          <TextInput
            title="Title"
            name="{prefix}-title"
            bind:value={session.name}
          />
          <TextInput
            title="Slug"
            name="{prefix}-slug"
            bind:value={session.slug}
          />
        </div>

        <TextareaInput
          title="Description"
          name="{prefix}-description"
          rows={2}
          bind:value={session.description}
        />

        <div class="grid grid-cols-2 gap-2">
          <DatetimeInput
            title="Start Time"
            name="{prefix}-start_time"
            value={datetime_string(session.start_time)}
          />
          <DatetimeInput
            title="End Time"
            name="{prefix}-end_time"
            value={datetime_string(session.end_time)}
          />
        </div>

        <NumericInput
          title="Capacity"
          name="{prefix}-capacity"
          bind:value={session.capacity}
        />
      </div>
    </div>
  {/each}
</form>
