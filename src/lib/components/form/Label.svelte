<script lang="ts">
  let { title, children } = $props();
</script>

<div class="mb-2">
  <label>
    <p class="font-semibold">{title}</p>
    {@render children()}
  </label>
</div>
