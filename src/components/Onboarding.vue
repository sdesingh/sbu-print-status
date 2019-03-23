<template>
 
    
  <transition name="fade">

      <div id="onboarding">

      <img class="loader font-weight-bold" src="https://loading.io/spinners/tail/index.gooey-ball-tail-spinner.svg" alt="Cat">
      <div id="title">Loading...</div>

    </div>

  </transition>



</template>

<style scoped>

    /* ANIMATIONS */
  .fade-enter-active, .fade-leave-active{
    transition: all .25s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .loader {
    margin-top: 10%;
    width: 300px;
    height: 300px;
  }

  #title {
    font-family: 'Google Sans', sans-serif;
    font-size: 40px;

    margin-top: 40px;
  }

  #onboarding {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    z-index: 3;
  }

</style>
