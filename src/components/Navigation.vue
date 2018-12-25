<template>
  
  <div id="navigation">

    <div id="links">
      <router-link class="button" to="/">Home</router-link> 
      <router-link class="button" to="/about">About</router-link>
      <button class="button" type="submit" @click="get">Refresh</button>
    </div>

    <div id="time"> 
      <div id="current-time"> {{ $store.state.notif.currentTime }} </div>
      <counter id="counter"/>
    </div>

    

  </div>
  
</template>

<style scoped>

  #navigation {
    background: white;
    box-shadow: 0 -2px 20px 2px rgba(0,0,0, 0.1)
  }

  .button {
    text-align: center;
    padding: 5px 20px;
    cursor: pointer;
    margin: 0px 10px;
    border: none;

    background: #990000;
    outline: none;
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    font-style: italic;
    text-decoration: none;
    font-weight: 700;

    transition: 0.2s linear;
  }
  
  .button:hover {
    background: white;
    color: #990000;
  }


  #time {
    position: absolute;
    top: 5px;
    right: 1%;
    text-align: right;
  }

  #current-time {
    font-family: 'Product Sans', sans-serif;
    font-weight: 700;
    font-size: 50px;

    margin-top: 5px;
  }

  #links {
    margin: auto 0;
    margin-left: 10px;
  }


</style>


<script>

import Counter from '@/components/Counter.vue'

export default {
  components: {
    Counter,
  },
  methods: {
    get(){
      this.$store.dispatch('getData')
    },
  },
}
</script>