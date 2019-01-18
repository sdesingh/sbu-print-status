<template>
  <div id="container">

    <transition name="fade">
      
      <!-- The Modal -->
      <div id="myModal" class="modal" v-if="showModal">
        

        <!-- Modal content -->
        <div class="modal-content">
          
          <!-- Close Button -->
          <span class="close" @click="$store.commit(toggle)"> &times; </span>

          <!-- Title -->
          <div id="title"> Settings </div>

          <!-- Content for the modal. -->
          <slot/>

          <div class="footer"></div>

        </div>

        <div class="bg" @click="$store.commit(toggle)"></div>
        
      </div>


    </transition>

  </div>
</template>

<style scoped>

  #title {
    font-family: 'Google Sans', sans-serif;
    font-size: 30px;
    padding: 20px;
    background: #333;
    color: white;
    margin: 0;
  }

  #content {
    padding: 30px;
  }

  .footer {
    height: 30px;
    background: #333;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* The Modal (background) */
  .modal {
    display: block;
    position: fixed; /* Stay in place */
    z-index: 3;
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
  }

  /* Modal Content/Box */
  .modal-content {
    position: fixed;
    z-index: 3;
    left: 0;
    right: 0;
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    width: 40%; /* Could be more or less, depending on screen size */
  }

  /* The Close Button */
  .close {
    color: #aaa;
    margin-right: 20px;
    margin-top: 20px;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }


  /* ANIMATIONS */
  .fade-enter-active, .fade-leave-active{
    transition: all .2s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }


  @media screen and (max-width: 1000px) {
    .modal-content {width: 70%;}
  }

  @media screen and (max-width: 600px) {

    .modal-content {width: 80%;}
  }

</style>

<script>

export default {
  props: ['showModal', 'toggle'],
  computed: {
    display() {
      return this.showModal ? 'block' : 'none'
    }
  }
}
</script>
