<template>
  <div class="home">
    <button @click="get">Get Data</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import API from '../util/API';


export default Vue.extend({
  name: 'home',
  components: {

  },
  methods: {
    get(){
      API.GetPrinters(
        (printers) => {
          console.log(printers);
        }
      )
    }
  }
});
</script>
