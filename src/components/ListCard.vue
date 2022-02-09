<template>
  <v-card outlined height="480px" class="px-1 pt-2" style="position: relative">
    <v-img
      :aspect-ratio="3 / 4"
      max-height="280px"
      :src="`https://www.themoviedb.org/t/p/w500${movie.poster_path}`"
    />
    <v-card-title>{{ movie.title }}</v-card-title>

    <v-card-text> {{ movie.release_date }} </v-card-text>
    <v-btn
      class="detail-btn pl-6"
      color="orange"
      @click="toDetail(movie), $emit('index')"
    >
      Detail
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: { movie: Object, page: Number },

  methods: {
    toDetail(item) {
      this.$store.commit("setMovie", item);
      this.$store.dispatch("getCast", item.id);
      this.$router.push({
        name: "Detail",
        params: { movieId: item.id, id: this.page },
      });
    },
  },
};
</script>