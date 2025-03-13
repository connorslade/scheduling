<script lang="ts">
  import Label from "./Label.svelte";

  let { title, value = $bindable() } = $props();
</script>

<Label {title}>
  <input
    class="p-1 border border-gray-300 rounded-md w-full"
    type="text"
    bind:value
  />
</Label>
