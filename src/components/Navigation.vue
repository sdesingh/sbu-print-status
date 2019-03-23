<template>
  
  <div id="navigation">

    <div class="topnav" id="myTopnav" :class="{ 'responsive': menuClicked }">

      <router-link class="link" to="/"> 
          <i class="link-icon fas fa-home"></i> Home
      </router-link>

      <router-link class="link" to="/about"> 
          <i class="link-icon fas fa-scroll"></i> Paper
      </router-link>

      <div class="link" v-on:click="$store.commit('toggleSettings')">
        <i class="link-icon fas fa-cog"></i> Settings
      </div>

      <div class="button" @click="refresh()">
        <i class="fas fa-sync-alt"></i>
      </div>

      <a class="icon link" v-on:click="menuClicked = !menuClicked">
        <i class="fa fa-bars"></i>
      </a>

      <div id="time"> 
        <counter id="counter"/>
      </div>
    </div>    

  </div>
  
</template>

<style scoped>

  #time {
    display: block;
    float: right; 
    padding: 17px 16px;
    text-align: center;
    
  }

  #current-time {
    font-family: 'Google Sans', sans-serif;
    font-weight: 700;
    font-size: 25px;
    color: white;
  }

  #counter {
    font-family: 'Google Sans', sans-serif;
    color: white;
    font-size: 15px;
    
  }

  /* Add a black background color to the top navigation */
  .topnav {
    background-color: #333;
    overflow: hidden;
    box-shadow: 0 -2px 20px 2px rgba(0,0,0, 0.5);
    z-index: 3;
  }

  /* Style the links inside the navigation bar */
  .topnav>.link,
  .topnav>.button{
    font-family: 'Open Sans', sans-serif;
    user-select: none;
    cursor: pointer;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 15px 16px;
    text-decoration: none;
    font-size: 17px;

    transition: 0.15s linear;
  }



  /* Change the color of links on hover */
  .topnav .link:hover,
  .topnav .button:hover{
    background-color: #ddd;
    color: black;
  }

  .button {
    float: right;
    background-color: #1DD1A1;
  }

  .link {
    float: left;
  }

  .link-icon {
    margin-right: 5px;
  }

  /* Add an active class to highlight the current page */
  .active {
    background-color: #1DD1A1;
    color: white;
  }

  /* Hide the link that should open and close the topnav on small screens */
  .topnav .icon {
    display: none;
  }


  /* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
  @media screen and (max-width: 600px) {
    .topnav .link:not(:first-child) {display: none;}
    .topnav .link.icon {
      float: right;
      display: block;
    }
    #time {
      display: none;
    }
  }

  /* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
  @media screen and (max-width: 600px) {
    .topnav.responsive {position: relative;}
    .topnav.responsive .link.icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .topnav.responsive .link {
      float: none;
      display: block;
      text-align: left;
    }
    .topnav .button {display: none}
  }


</style>

<script>

import Counter from '@/components/Counter.vue'

export default {
  data() {
    return {
      menuClicked: false
    }
  },
  components: {
    Counter,
  },
  methods: {
    refresh(){
      this.$store.dispatch('getData');
      this.$store.dispatch('resetCounter');
    },
  },
}
</script>