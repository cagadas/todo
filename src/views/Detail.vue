<template>
  <v-container class="item-container">
    <v-row v-if="movie !== null && movie !== undefined">
      <v-col cols="12">
        <MovieDetails :movie="movie" />
      </v-col>
      <v-col
        v-for="(cast, index) in getCast.slice(0, 12)"
        :key="index"
        class="mt-16"
        cols="6"
        md="2"
        sm="3"
        order="4"
      >
        <CastCard :cast="cast" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//vuex
import { mapGetters } from "vuex";

//components
import MovieDetails from "../components/MovieDetails";
import CastCard from "../components/CastCard";

export default {
  components: {
    CastCard,
    MovieDetails,
  },

  created() {
    this.$store.commit("setPage", this.$route.params.id);
    if (this.$store.state.movieList.length === 0) {
      this.$store.dispatch("getList");
    }
    this.$store.state.cast.length > 0
      ? ""
      : this.$store.dispatch("getCast", this.$route.params.movieId);
  },

  computed: {
    ...mapGetters(["getMovie", "getGenres", "getCast"]),

    movie() {
      var movie = null;
      if (Object.keys(this.getMovie).length > 0) {
        movie = this.getMovie;
      } else {
        movie = this.$store.state.movieList.filter((t) => {
          if ("" + this.$route.params.movieId === "" + t.id) {
            this.$store.commit("setMovie", t);
            return t;
          }
        })[0];
      }
      return movie;
    },
  },
};
</script>