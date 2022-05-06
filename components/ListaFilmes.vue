<template>
  <b-container :class="{'default-container': this.containerView}">

    <b-card-group columns>
      <b-card
        v-for="movie in movies"
        :title="movie.title"
        :key="movie.id"
        :img-src="getPosterPath(movie)"
        :img-alt="movie.title"
        img-top>

        <b-card-text class="overview-text">
          {{ movie.overview }}
        </b-card-text>

        <b-button @click="goToMovie(movie.id)" variant="primary">Ver mais</b-button>

        <template #footer>
          <b-form-rating :value="movie.vote_average" readonly show-value stars="10"/>
        </template>

      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
export default {
  name: "Catálogo",

  props: {
    moviesUrl: {
      type: String,
      required: false,
      default: "/movie/popular"
    },
    additionalParams: {
      type: Object,
      required: false
    },
    moviesIds: {
      type: Array,
      required: false
    },
    containerView: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data() {
    return {
      movies: []
    }
  },

  methods: {
    async getMovies() {
      // juntar os parâmetros adicionais aos necessários
      let params = process.env.paramsUrl
      if (this.additionalParams) {
        params = Object.assign({}, this.additionalParams, params);
      }

      if (this.moviesIds) {
        for (const movieId of this.moviesIds) {
          await this.$axios.$get(`/movie/${movieId}`, {params: params}).then((response) => {
            this.movies = [...this.movies, response]
          }).catch((error) => {
            this.$toast.error("Erro:" + error)
          })
        }
      } else {
        await this.$axios.$get(this.moviesUrl, {params: params}).then((response) => {
          this.movies = response.results
        }).catch((error) => {
          this.$toast.error("Erro:" + error)
        })
      }
    },
    getPosterPath(movie) {
      return `http://image.tmdb.org/t/p/original${movie.poster_path}`
    },
    goToMovie(id) {
      this.$router.push(`/filme/${id}`)
    }
  },

  beforeMount() {
    this.getMovies()
  }
}
</script>

<style scoped>
  .overview-text {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 9em;
    line-height: 1.8em;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
</style>
