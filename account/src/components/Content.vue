<template>
    <div> {{ counts }} </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('todos', {
      counts: 'getCount',
    })
  }
};
</script>
