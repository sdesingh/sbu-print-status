<template>
  <div id="app">

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    
    <onboard v-if="showOnboarding"/>
    
    <modal id="settings" :show-modal="showSettings" :toggle=" 'toggleSettings' "> 
      <settings/>
    </modal>  

    <navigation/>
    <router-view id="router-view"/>

  </div>
</template>

<script>

  // import Navigation from '@/components/Navigation.vue'
  import Navigation from '@/components/Layout/Nav.vue'
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
    src: url('https://fonts.gstatic.com/s/googlesans/v12/4UabrENHsxJlGDuGo1OIlLV154tzCwZsPF4o.woff2') format('woff2');
  }

  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

  @font-face {
    font-family: 'Google Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Google Sans Regular'), local('GoogleSans-Regular'), url(https://fonts.gstatic.com/s/googlesans/v11/4UaGrENHsxJlGDuGo1OIlL3Owp5eKQtG.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

   #app {
    /* font-family: 'Open Sans', sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  } 


  body {
    margin: 0;
    padding: 0;
    background: #F7F7F7;
  }

  #router-view{
    margin-top: 80px;
  }

</style>
