<script lang="ts">
  let dialog: HTMLDialogElement | undefined = $state();

  let { show = $bindable(), children } = $props();

  $effect(() => {
    if (show) dialog?.showModal();
    else dialog?.close();
  });
</script>

<dialog
  class="max-w-120 rounded-lg border-none p-4 fixed top-1/2 left-1/2 -translate-1/2 bg-white shadow-lg"
  bind:this={dialog}
  onclose={() => (show = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  {@render children?.()}
</dialog>

<style>
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
</style>
