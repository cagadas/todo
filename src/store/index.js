import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const apiKey = "fcf5144956604f154a8c4fef2e5a1346"
export default new Vuex.Store({
  state: {
    page: 1,
    filter: '',
    lang: null,
    movie: {},
    movieList: [],
    genres: [],
    cast: [],
  },
  mutations: {
    setMovie(state, movie) {
      state.movie = movie
    },
    setFilter(state, filter) {
      state.filter = filter
    },
    setLang(state, lang) {
      state.lang = lang
    },
    setPage(state, page) {
      state.page = page
    }
  },
  getters: {
    getMovieList(state) {
      return state.filter !== '' ? state.movieList.filter(t => t.title.toLowerCase().includes(state.filter?.toLowerCase())) : state.movieList
    },
    getMovie: state => state.movie,
    getGenres: state => state.genres,
    getCast: state => state.cast
  },
  actions: {
    async getList({ state, commit }, todo) {
      var _lang = state.lang || "tr-TR"
      var _page = 0
      var _path = null
      if (state.page !== 1 && todo === "langChange") {
        state.movieList = []
        for (var i = 1; i <= state.page; i++) {
          _page = i
          _path = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${_lang}&page=${_page}`
          await axios
            .get(_path)
            .then((res) => {
              state.movieList = state.movieList.length === 0 ? [...res?.data?.results] : [...state.movieList, ...res?.data?.results]
              if (parseInt(state.page) === i) {
                commit('setMovie', {})
              }
            }).catch((err) => {
              console.error("Getting movie list is failed : ", err)
            })
        }
      } else {
        _page = state.page
        _path = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${_lang}&page=${_page}`
        axios
          .get(_path)
          .then((res) => {
            if (todo === "langChange") {
              state.movieList = [...res?.data?.results]
            } else {
              state.movieList = state.movieList.length === 0 ? [...res?.data?.results] : [...state.movieList, ...res?.data?.results]
            }
          }).catch((err) => {
            console.error("Getting movie list is failed : ", err)
          })
      }
    },
    getGenres({ state }) {
      var _page = state.page
      var _lang = state.lang || "tr-TR"
      var path = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${_lang}&page=${_page}`
      return axios
        .get(path)
        .then((res) => {
          state.genres = res.data.genres
        }).catch((err) => {
          console.error("Getting genre list is failed : ", err)
        })
    },
    getCast({ state }, id) {
      var path = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=fcf5144956604f154a8c4fef2e5a1346`
      return axios
        .get(path)
        .then((res) => {
          state.cast = res.data.cast
        }).catch((err) => {
          console.error("Getting cast list is failed : ", err)
        })
    }
  },
  modules: {
  }
})
