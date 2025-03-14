<script>
  let {
    disabled = false,
    on_click = () => {},
    class: _class = "",
    type: _type = "button",
    children,
  } = $props();
</script>

<button
  type={_type}
  class="p-1 border border-gray-300 rounded-md font-bold py-2 px-4 cursor-pointer {_class}"
  onclick={() => on_click()}
  {disabled}
>
  {@render children()}
</button>
