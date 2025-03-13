<script lang="ts">
  let { children, href, new_tab = true } = $props();
</script>

<a
  class="text-blue-600 hover:underline"
  {href}
  target={new_tab ? "_blank" : ""}
  rel="noopener noreferrer"
>
  {@render children()}
</a>
