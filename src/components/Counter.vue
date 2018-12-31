<template>
  <div>
    Refreshing in... {{ count }}s.
  </div>
</template>

<script>
import { setInterval } from 'timers';

export default {
  computed: {
    count(){
      return this.$store.state.dispatcher.counter
    }
  }
}
</script>