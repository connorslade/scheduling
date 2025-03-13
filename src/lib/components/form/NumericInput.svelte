<script lang="ts">
  import { kebab_case } from "$lib/util";
  import Label from "./Label.svelte";

  let { title, name = kebab_case(title), value = $bindable() } = $props();
</script>

<Label {title}>
  <input
    class="p-1 border border-gray-300 rounded-md w-full"
    type="number"
    bind:value
    {name}
  />
</Label>
