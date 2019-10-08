<template>
  <div id="printer-grid">
    
    <div class="printer-card" v-for="(item, index) in 15" :key="index">
      <div style="text-align: center;">p</div>
    </div>

  </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['data']
})
</script>


<style scoped>

  #printer-grid {
    display: grid;
    margin: 50px 20px;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 10px;
  }

  .printer-card {
    background: coral;
    height: 350px;
  }

</style>