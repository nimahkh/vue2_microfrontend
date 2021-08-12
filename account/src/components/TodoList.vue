<template>
  <div class="w-full flex justify-items-center justify-center">
    <div class="bg-gray-100 w-3/5 rounded px-6">
    <div class="p-5 border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between my-4">
        <div class="font-semibold text-gray-800">Todo List</div>
    </div>
    <div v-for="todo in allTodos">
      <hr class="-mx-6"/>
      <div class="flex items-center justify-between m-4 p-2">
          <div class="w-16">
          <img class="w-12 h-12 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/GNOME_Todo_icon_2019.svg/128px-GNOME_Todo_icon_2019.svg.png">
          </div>
          <div class="flex-1 pl-2">
              <div class="text-gray-700 font-semibold">
               {{ todo }}
              </div>
          </div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("todos", {
      allTodos: "getTodos",
    }),
  },
};
</script>
