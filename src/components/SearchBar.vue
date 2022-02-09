<template>
  <v-col cols="12">
    <v-text-field
      placeholder="Search..."
      outlined
      prepend-inner-icon="mdi-magnify"
      class="search-bar"
      v-model="search"
      @input="filterList"
    />
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    filterList(val) {
      this.$store.commit("setFilter", val);
    },
  },
};
</script>