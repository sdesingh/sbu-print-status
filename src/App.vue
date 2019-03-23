<template>
  <div id="app">

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <onboard v-if="showOnboarding"/>

    <navigation/>

    <modal id="settings" :show-modal="showSettings" :toggle=" 'toggleSettings' "> 
      <settings/>
    </modal>  
  
    <router-view id="router-view"/>

  </div>
</template>

<script>

  import Navigation from '@/components/Navigation.vue'
  import Modal from '@/components/Modal.vue'
  import Settings from '@/components/Modals/Settings.vue'
  import Onboard from '@/components/Onboarding.vue'

  export default {
    data() {
      return {

      }
    },
    components: {
      Navigation,
      Modal,
      Settings,
      Onboard,
    },
    computed: {
      showSettings() {return this.$store.state.ui.showSettings },
      showOnboarding() { return this.$store.state.ui.showOnboarding }

    },
    mounted() {

      // Load default settings.
      this.$store.dispatch('loadDefaultSettings')

      // Hide onboarding screen after 2 seconds.
      setTimeout(() => {
        this.$store.commit('toggleOnboarding')
      }, 2500);


      setInterval(() => {
        this.$store.dispatch('update')
      }, 1000)


    }
  }
</script>

<style>

  @font-face {
    font-family: 'Google Sans';
    font-weight: 700;
    src: url('https://fonts.gstatic.com/s/googlesans/v11/4UabrENHsxJlGDuGo1OIlLV154tzCwZsPF4o.woff2') format('woff2');
  }

   #app {
    /* font-family: 'Open Sans', sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  } 

  #router-view {
    margin-top: 75px;
    z-index: 1;
    height: 100%;
  }

  #navigation {
    position: fixed;
    overflow: hidden;
    top: 0;
    /* height: 100px; */
    width: 100%;
    z-index: 2;

  }

  body {
    margin: 0;
    padding: 0;
    background: #F7F7F7;
  }

</style>
