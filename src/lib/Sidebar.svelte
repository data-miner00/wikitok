<script lang="ts">
  let searchText: string;

  let inputField: Element;

  function clearInputIfEscaped(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      searchText = '';
    }
  }
</script>

<div>
  <nav class="h-screen w-[15rem] bg-gray-300">
    <div class="bg-amber-400 px-8 py-4 text-2xl font-bold">Wikitok</div>
    <div>
      <div
        class="mx-auto flex w-[208px] items-center overflow-hidden rounded-full bg-white p-1 pl-4"
      >
        <div class="grid h-full place-items-center">
          <div>
            <i class="bi bi-search"></i>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search"
          class="w-full px-2 py-1 text-sm outline-none"
          bind:this={inputField}
          on:keydown={clearInputIfEscaped}
          bind:value={searchText}
        />
      </div>
    </div>

    <ul class="text-xl">
      <li class="mx-auto my-1 w-[208px] rounded-lg px-2 py-2 hover:bg-gray-200">
        <i class="bi bi-facebook"></i>Home
      </li>
      <li class="mx-auto my-1 w-[208px] rounded-lg px-2 py-2 hover:bg-gray-200">
        <i class="bi bi-facebook"></i>Explore
      </li>
      <li class="mx-auto my-1 w-[208px] rounded-lg px-2 py-2 hover:bg-gray-200">
        <i class="bi bi-facebook"></i>Wikipedia
      </li>
      <li class="mx-auto my-1 w-[208px] rounded-lg px-2 py-2 hover:bg-gray-200">
        <i class="bi bi-facebook"></i>Bookmarks
      </li>
      <li class="mx-auto my-1 w-[208px] rounded-lg px-2 py-2 hover:bg-gray-200">
        <i class="bi bi-facebook"></i>Profile
      </li>
      <li class="mx-auto my-1 w-[208px] rounded-lg px-2 py-2 hover:bg-gray-200">
        <i class="bi bi-facebook"></i>More
      </li>
    </ul>
  </nav>
</div>
