<template>
  <v-row>
    <v-col class="d-flex justify-center" cols="12" md="3" sm="12" order="2">
      <v-img
        class="posterImage mb-4"
        :aspect-ratio="3 / 4"
        :src="`https://www.themoviedb.org/t/p/w500${movie.poster_path}`"
      >
      </v-img>
    </v-col>
    <v-col
      class="detail pl-4 pt-5"
      cols="12"
      md="7"
      sm="12"
      order="3"
      order-md="2"
    >
      <span class="mb-4 d-block">{{ movie.title }}</span>
      <span class="mb-4 d-block">
        {{ movie.release_date }}
      </span>
      <span v-for="genre in genres" :key="genre.id" class="mb-6">
        {{ genre.name }}
      </span>
      <span class="text-h4 my-4 d-block"> Overview </span>
      <v-card class="pa-3" outlined max-width="500px">
        {{ movie.overview }}
      </v-card>
    </v-col>
    <v-col class="pr-8" cols="12" md="2" order="1" order-md="3">
      <v-btn
        class="float-end"
        tile
        icon
        min-width="90px"
        @click="$router.go(-1)"
      >
        <v-icon class="mr-1">mdi-chevron-left</v-icon>
        Back
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
//vuex
import { mapGetters } from "vuex";

export default {
  props: { movie: Object },
  computed: {
    ...mapGetters(["getGenres"]),

    genres() {
      var genreList = [];
      genreList = this.getGenres.filter((t) =>
        this.movie?.genre_ids?.includes(t.id)
      );
      return genreList;
    },
  },
};
</script>