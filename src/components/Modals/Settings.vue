<template>

  <div class="container">

    <div class="setting">
      <div class="setting-name">Use Test Data</div>
      <toggle-switch class="option"/>
    </div>

    <div class="setting">
      <div class="setting-name">Notifications</div>
      <toggle-switch class="option"/>
    </div>

    <div class="setting">
      <div class="setting-name">Refresh Rate</div>
      <input type="text" class="option text-input" >
    </div>

    

  </div>

</template>

<style scoped>

  .container {
    background: white;
    padding: 30px 10%;
  }

  .setting {
    display: block;
    padding: 20px 0px;
    border-bottom: 0.5px solid rgba(0,0,0, 0.1);
  }

  .text-input {
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    font-size: 20px;
    font-style: italic;

    padding: 0px 10px;
    width: 30px;
  }

  .setting-name {
    display: inline;
    text-align: left;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 18px;
    
  }

  .option {
    display: block;
    float: right;
    margin: auto;
  }
</style>

<script>

import ToggleSwitch from '@/components/Interactables/ToggleSwitch.vue'

export default {
  components: {
    ToggleSwitch
  }
}

</script>
