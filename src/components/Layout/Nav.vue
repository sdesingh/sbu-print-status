<template>

<!-- Image and text -->
  <nav class="navbar navbar-dark navbar-expand-lg fixed-top bg-dark">

    <a class="navbar-brand" href="#">
      <!-- <img src="../../assets/logo.png" height="30" alt="" srcset=""> -->
      <!-- <span>Print Stats</span> -->
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">

      <!-- List of Nav Items -->
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

        <!-- Loop through all of the nav links and routes. -->
        <li v-for="(link, index) in navLinks" :key="index" class="nav-item">
          <router-link class="nav-link" :to="link.route"> {{ link.routeName }} </router-link>
        </li>

        <!-- Settings Button -->
        <li class="nav-item" style="cursor: pointer;" @click="$store.commit('toggleSettings')">
          <div class="nav-link">Settings</div>
        </li>

      </ul>

      <!-- Showing Refresh Counter and Refresh Button -->
      <div class="pull-right list-inline">
        <counter id="counter" class="list-inline-item text-light mr-3"></counter>
        <button class="list-inline-item btn btn-success my-2 my-sm-0" @click="refresh()"> <i class="fas fa-sync-alt"> </i></button>
      </div>

      
    </div>


  </nav>

</template>

<script>
import Counter from '@/components/Counter.vue'

export default {
  components: {
    Counter
  },
  data(){
    return {
      navLinks: 
      [
        {routeName: 'Home', route: '/'},
        {routeName: 'Logs', route: '/logs'},
        {routeName: 'About', route: '/about'}
      ],
    }
  },
  methods: {
    refresh(){
      this.$store.dispatch('getData');
      this.$store.dispatch('resetCounter');
    },
  }
}
</script>

<style scoped>


</style>
