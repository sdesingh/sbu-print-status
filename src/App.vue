<template>
  <div id="app">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <navigation/>
    <router-view id="router-view"/>
    

  </div>
</template>

<script>

  import Navigation from '@/components/Navigation.vue'

  export default {
    components: {
      Navigation
    }
  }
</script>

<style>

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,700i');

  @font-face {
    font-family: 'Google Sans';
    font-weight: 700;
    src: url('https://fonts.gstatic.com/s/googlesans/v11/4UabrENHsxJlGDuGo1OIlLV154tzCwZsPF4o.woff2') format('woff2');
  }

  #app {
    font-family: 'Roboto', sans-serif;
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
