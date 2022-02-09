<template>
  <v-container class="item-container">
    <v-row>
      <SearchBar />
      <v-col cols="12" sm="12">
        <v-row class="d-flex justify-start">
          <SortCard />
          <v-col
            v-for="(movie, index) in getMovieList"
            :key="index"
            class="item-card"
            :class="`card-${movie.id}`"
          >
            <ListCard
              :movie="movie"
              :page="counter"
              @index="handleScroll(index)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//vuex
import { mapGetters } from "vuex";

//components
import SearchBar from "../components/SearchBar";
import SortCard from "../components/SortCard";
import ListCard from "../components/ListCard";

export default {
  name: "Home",
  data() {
    return {
      page: 0,
      counter: 1,
    };
  },
  components: {
    SearchBar,
    SortCard,
    ListCard,
  },

  created() {
    this.counter =
      this.$route.params?.id !== this.counter
        ? parseInt(this.$route.params?.id)
        : this.counter;
    window.addEventListener("scroll", this.handleScroll);
    if (this.$store.state.movieList.length === 0) {
      this.$store.dispatch("getList");
    }
    this.$store.dispatch("getGenres");
  },

  mounted() {
    if (this.$store.state.movie?.id) {
      this.scrollToElement();
    }
  },

  computed: {
    ...mapGetters(["getMovieList"]),
  },

  methods: {
    scrollToElement() {
      var card = this.$el.getElementsByClassName(
        `card-${this.$store.state.movie.id}`
      )[0];
      card.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },

    handleScroll(index) {
      var condition =
        window.innerHeight + window.scrollY > document.body.offsetHeight - 120;
      var condition2 = typeof index === "number";
      if (condition || condition2) {
        this.counter = condition2 ? this.pageNumber(index) : this.counter + 1;
        this.$store.commit("setPage", this.counter);
        this.$store.dispatch("getList");
      }
    },
    pageNumber(index) {
      return (this.page = Math.floor(index / 20) + 1);
    },
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

