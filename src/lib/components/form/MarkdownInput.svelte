<script>
  import TextareaInput from "./TextareaInput.svelte";
  import Link from "../Link.svelte";
  import Text from "../Text.svelte";

  let { title, rows = 8, value = $bindable() } = $props();
</script>

<TextareaInput {title} {rows} bind:value>
  <Text>
    This text box supports <Link
      href="https://www.markdownguide.org/cheat-sheet">markdown</Link
    > formatting.
  </Text>
</TextareaInput>
