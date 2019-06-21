<template>
  <div id="app">

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    
    <onboard v-if="showOnboarding"/>
    
    <modal id="settings" :show-modal="showSettings" :toggle=" 'toggleSettings' "> 
      <settings/>
    </modal>  

    <navigation/>

    <transition name="fade">
      <router-view id="router-view"/>
    </transition>

  </div>
</template>

<script>

  // import Navigation from '@/components/Navigation.vue'
  import Navigation from '@/components/Layout/Nav.vue'
  import Modal from '@/components/Modal.vue'
  import Settings from '@/components/Modals/BSettings.vue'
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
      }, 800);


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
    height: 100vh;
  } 


  body {
    overflow: auto;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: #F7F7F7;
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }

  #router-view{
    margin-top: 70px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  } 

</style>
