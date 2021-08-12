<template>
  <div>
    <button @click="countInc">Increment</button>
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
  methods: mapActions("todos", ["countInc"]),
};
</script>
