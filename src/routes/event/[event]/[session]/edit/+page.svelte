<script lang="ts">
  import type { PageProps } from "./$types";
  import SessionEdit from "$lib/modules/SessionEdit.svelte";

  let { data }: PageProps = $props();
</script>

<SessionEdit event={data.event} session={data.session} />
