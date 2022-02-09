<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn-toggle
        mandatory
        dense
        v-model="lang"
        borderless
        rounded
        style="color: white"
      >
        <v-btn @click="language('tr-TR')">
          <span>TR</span>
        </v-btn>

        <v-btn @click="language('en-US')">
          <span>EN</span>
        </v-btn>
      </v-btn-toggle>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      lang: null,
    };
  },
  methods: {
    language(val) {
      this.lang = val || null;
      this.$store.commit("setLang", val);
      this.$store.dispatch("getList", "langChange");
      this.$store.dispatch("getGenres");
    },
  },
};
</script>
