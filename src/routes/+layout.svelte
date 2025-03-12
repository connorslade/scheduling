<script lang="ts">
  import "../app.css";

  import NavDropdown from "$lib/components/NavDropdown.svelte";
  import Link from "$lib/components/Link.svelte";

  let { children } = $props();

  let pages = [
    { title: "Home", href: "/" },
    { title: "Events", href: "/events" },
    { title: "Login", href: "/api/auth/login" },
  ];
</script>

<div class="main-container grid grid-cols-100% min-h-screen">
  <nav
    class="flex flex-wrap justify-center sm:justify-between items-center p-4 shadow-md"
  >
    <a class="text-lg mr-4" href="/">Scheduling</a>
    <div class="flex flex-wrap space-x-2 sm:space-x-4 justify-center">
      {#each pages as page}
        <a
          href={page.href}
          class="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >{page.title}</a
        >
      {/each}
    </div>
  </nav>

  <div class="max-w-3xl mx-auto mb-4 pl-4 pr-4">
    {@render children()}
  </div>

  <footer class="p-4 text-center border-t border-gray-200">
    <p>Website by <Link href="https://connorcode.com">Connor Slade</Link></p>
  </footer>
</div>

<style>
  .main-container {
    grid-template-rows: auto 1fr auto;
  }
</style>
