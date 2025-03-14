<script lang="ts">
  import { kebab_case } from "$lib/util/misc";
  import Label from "./Label.svelte";

  let { title, rows, name = kebab_case(title), value = $bindable() } = $props();
</script>

<Label {title}>
  <textarea
    class="p-1 border border-gray-300 rounded-md w-full"
    {rows}
    bind:value
    {name}
  ></textarea>
</Label>
