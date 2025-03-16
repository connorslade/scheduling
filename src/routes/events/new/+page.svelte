<script lang="ts">
  import EventEdit from "$lib/modules/EventEdit.svelte";
  import type { Event } from "@prisma/client";

  let { data } = $props();

  let empty_event: Event = {
    name: "New Event",
    id: crypto.randomUUID(),
    slug: "",
    description: "",
    brief: "",
    start_date: null,
    end_date: null,
    admin_user_id: [data.user.id],
  };
</script>

<EventEdit event={empty_event} back="/events" prefix="Creating" />
