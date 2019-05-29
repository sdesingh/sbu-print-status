<template>
  <div class="card">

    <div class="card-section">
      <div class="card-body">
        <h4 class="card-title font-weight-bold">App Settings</h4>
        <p class="card-text">Set supply thresholds, how often the data is refreshed and how the data displayed.</p>

        <!-- Supply Thresholds -->
        <div class="input-group">
          <div class="input-group-prepend">
            <button class="btn btn-outline-success dropdown-toggle" type="button" data-toggle="dropdown"> {{ currentSupply.name }} (%)</button>
            <div class="dropdown-menu">

              <!-- vFor all the supplies loaded. -->
              <a v-for="(supply, i) in supplyThresholds" :key="i" class="dropdown-item" @click="setSelectedSupply(i)"> {{supply.name}} </a>

              <div role="separator" class="dropdown-divider"></div>

              <!-- Reset supplies to defaults. -->
              <a class="dropdown-item" href="#">Reset to Defaults</a>
            </div>
          </div>

          <!-- Input for Editing the Threshold -->
          <input type="number" class="form-control" placeholder="Select a Threshold to Edit" v-model="currentSupply.value" @input="changedSettings=true">
        </div>

        <!-- Refresh Rate -->
        <div class="input-group mt-3 mb-3">

          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Refresh Rate (Minutes)</span>
          </div>

          <input class="form-control" placeholder="Data Refresh Rate (Minutes)" 
          v-model="refreshRate" 
          @input="changedSettings=true"
          type="number">
        </div>

      </div>


    </div>

    <div class="card-section">
      <div class="card-body">
        <h4 class="card-title font-weight-bold">Development</h4>
        <p class="card-text">Settings used for testing or for offline demo of the application.</p>
      </div>

      <ul class="list-group list-group-flush">

        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>Enable Test Data</span>
          <toggle-switch :checked="useTestData" :toggle="'useTestData'"/>
        </li>

      </ul>
    </div>

    <button v-if="changedSettings" class="btn btn-success mx-auto mb-3" @click="saveSettings" style="width: 10rem">Save</button>


  </div>
</template>

<style scoped>
  .custom-control-label {
    height: 2rem;

  }
</style>

<script>
import ToggleSwitch from '@/components/Interactables/ToggleSwitch'

export default {
  data(){
    return {
      supplyThresholds: [],
      refreshRate: 1,
      selectedSupply: -1,
      currentSupplyThreshold: '',
      changedSettings: false
    }
  },
  components: {
    ToggleSwitch
  },
  computed: {
    useTestData(){
      return this.$store.state.settings.useTestData
    },
    currentSupply(){
      if(this.selectedSupply == -1){
        return {name: 'Threshold', value: ''}
      }
      else {
        return this.supplyThresholds[this.selectedSupply]
      }
    },
  },
  methods: {
    setSelectedSupply(supplyIndex){
      this.selectedSupply = supplyIndex;
      console.log('select')
      this.currentSupplyThreshold = this.getThreshold(supplyIndex)
    },
    getThreshold(supplyIndex){
      return this.supplyThresholds[supplyIndex].value
    },
    validateInput(){

    },
    loadSettings(){
      this.supplyThresholds = this.$store.state.settings.supplyThresholds;
      this.refreshRate = this.$store.state.settings.refreshRate
    },
    saveSettings(){

      // Commit the new thresholds.
      this.$store.commit('updateThresholds', this.supplyThresholds);

      // Set the refresh rate.
      this.$store.commit('setRefreshRate', this.refreshRate);
      this.$store.dispatch('resetCounter');

      // Save all settings in cookies.
      this.$store.dispatch("saveSettings");

      // Hide Save Button
      this.changedSettings = false
    }

  },
  mounted(){
    this.loadSettings();
  }

  
}
</script>