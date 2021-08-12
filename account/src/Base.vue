<template>
  <div>
    <Content />
    <Button />
    <Todo/>
    <TodoList/>
  </div>
</template>

<script>
import Content from "./components/Content.vue";
import Button from "./components/Button.vue";
import Todo from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";

export default {
  components: {
    Content,
    Button,
    Todo,
    TodoList
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    inc () {
      this.count++
    }
  }
};
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
