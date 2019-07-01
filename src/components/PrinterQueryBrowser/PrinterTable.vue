<template>
  <div>
    <table
      id="example"
      class="table table-hover table-bordered text-center mt-4"
      style="width:100%"
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Updated At</th>
          <th scope="col">Status Message</th>
          <th scope="col">Toner</th>
          <th scope="col">Drum</th>
          <th scope="col">Maint. Kit</th>
        </tr>
      </thead>

      <tbody v-if="data.length != 0">
        <tr v-for="(printer, index) in data" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ printer.updatedAt }}</td>
          <td>{{ printer.statusMessage }}</td>
          <td>{{ printer.tonerStatus }}%</td>
          <td>{{ printer.drumStatus }}%</td>
          <td>{{ printer.maintKitStatus }}%</td>
        </tr>
      </tbody>
    </table>

    <h4 v-if="data.length == 0" class="text-center">No data found for this query.</h4>
  </div>
</template>

<script>
import { Printer } from "../../model/Printer";

export default {
  props: ["data"],
  data() {
    return {
      printerData: []
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.printerData.len;
      this.printerData.push(Printer.GenerateRandomPrinter());
    }
  }
};
</script>

<style scoped>
thead {
  background-color: #e9ecef;
}
</style>
