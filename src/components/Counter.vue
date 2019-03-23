<template>
  <div>
    Refreshing in... {{ count }}s.
  </div>
</template>

<script>

export default {
  computed: {
    count(){
      return this.$store.state.dispatcher.counter
    }
  }
}
</script>