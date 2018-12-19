<template>
  <div id="app">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">


    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <router-view/>
  </div>
</template>

<script>
  export default {

  }
</script>


<style>
  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    margin-bottom: 60px;
    margin-left: 1%;
    margin-right: 1%;
    
  }

  body {
    background: #F7F7F7;
  }

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,700i');

  @font-face {
    font-family: 'Google Sans';
    font-weight: 700;
    src: url('https://fonts.gstatic.com/s/googlesans/v11/4UabrENHsxJlGDuGo1OIlLV154tzCwZsPF4o.woff2') format('woff2');
  }
</style>
