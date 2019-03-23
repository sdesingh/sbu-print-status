<template>
  <div class="about">

    <!-- <img class="loader" src="https://loading.io/spinners/bluecat/index.blue-longcat-spinner.svg" alt="Cat"> -->
    <printer-card></printer-card>



  </div>
</template>

<style scoped>

  .about {
    margin: auto;
  }

  .card-footer {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .loader {
    height: 300px;
    width: 300px;
  }
</style>

<script>
import PrinterCard from '../components/PrinterInfoCard'

export default {
  components: {
    PrinterCard
  }
}
</script>
