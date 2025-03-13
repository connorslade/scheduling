<script lang="ts">
  import Label from "./Label.svelte";

  let { title, rows, value = $bindable() } = $props();
</script>

<Label {title}>
  <textarea
    class="p-1 border border-gray-300 rounded-md w-full"
    {rows}
    bind:value
  ></textarea>
</Label>
