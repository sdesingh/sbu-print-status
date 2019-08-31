<template>
  <div class="about">

    <div class="container align-middle">
      Printer Stats is built and maintained by Sam Singh.
    </div>



  </div>
</template>

<style scoped>

  .container {
    padding-top: 300px;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .about {
    width: 100%;
    height: 100%;
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
