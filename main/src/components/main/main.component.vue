<template>
  <div
    class="
      flex
      items-center
      justify-center justify-self-center
      m-auto
      flex-col
      w-3/4
      rounded
      shadow-lg
      border-1 border-light-blue-500 border-opacity-1
      min-h-full
    "
  >
    <div class="grid grid-cols-1 divide-y divide-light-blue-500 w-full shadow">
      <div class="w-3/4 pb-5 flex flex-row justify-around m-auto mt-5">
        <div class="flex flex-row">
          <span> How many Todo I have? </span>
          <span class="ml-2"> <counter /> </span>
        </div>
        <div><todo-input /></div>
      </div>

      <div class="w-full pt-5 pb-5">
        <todo-list />
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {};
</script>