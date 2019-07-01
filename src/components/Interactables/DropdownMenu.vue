<template>
  <div class="input-group-prepend">
    <button
      class="btn btn-outline-success dropdown-toggle"
      type="button"
      data-toggle="dropdown"
      style="width:100%;"
    >{{ selectedOption }}</button>

    <div class="dropdown-menu">
      <!-- vFor all the different options in the dropdown menu -->
      <a
        v-for="(option, i) in options"
        :key="i"
        class="dropdown-item"
        @click="setSelectedOption(i)"
      >{{ option }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      options: this.value.options
    };
  },
  methods: {
    setSelectedOption(option_index) {
      this.value.selectedOptionIndex = option_index;
    }
  },
  computed: {
    selectedOption() {
      return this.options[this.value.selectedOptionIndex];
    }
  }
};
</script>