<template>
  <div class="w-full flex justify-items-center justify-center">
    <input class="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="todo" placeholder="Write your todo ... " />
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="handleAddTodo(todo)">Submit todo</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      todo: "",
    };
  },
  methods: {
    ...mapActions("todos", ["addTodo", "countInc"]),
    handleAddTodo(todo) {
      this.todo = "";
      this.addTodo(todo);
      this.countInc()
    },
  },
};
</script>
