<script lang="ts">
  import type { PageProps } from "./$types";
  import Subtitle from "$lib/components/Subtitle.svelte";
  import Text from "$lib/components/Text.svelte";
  import Link from "$lib/components/Link.svelte";
</script>

<Subtitle title="Welcome to Scheduling" />

<Text
  >Work in progress event scheduling platform. Go check out <Link
    href="/events"
    new_tab={false}>events</Link
  > and sign up for some sessions!</Text
>
