<template>
  <v-col class="sort-container">
    <v-card min-height="480px" class="d-flex justify-center" outlined>
      <v-col class="d-flex" cols="12" sm="12">
        <v-select
          v-model="sort"
          :items="options"
          @change="sortItem"
          label="Sıralama"
          dense
          outlined
        />
      </v-col>
    </v-card>
  </v-col>
</template>

<script>
//vuex
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      sort: "",
      options: [
        { text: "Popülerlik(Önce Yüksek) ", value: "popularity-up" },
        { text: "Popülerlik(Önce Düşük) ", value: "popularity-down" },
        { text: "Puana Göre(Önce Yüksek)", value: "vote_average-up" },
        { text: "Puana Göre(Önce Düşük)", value: "vote_average-down" },
        { text: "Çıkış Tarihi(Önce Eski)", value: "release_date-up" },
        { text: "Çıkış Tarihi(Önce Yeni)", value: "release_date-down" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getMovieList"]),
  },
  methods: {
    sortItem(val) {
      var value = val.split("-")[0];
      var direction = val.split("-")[1];
      this.getMovieList.sort((a, b) => {
        if (value === "release_date") {
          var date1 = new Date(a[value]).getTime();
          var date2 = new Date(b[value]).getTime();
          return direction === "up" ? date1 - date2 : date2 - date1;
        } else {
          return direction === "up" ? b[value] - a[value] : a[value] - b[value];
        }
      });
    },
  },
};
</script>