<template>
  <b-container class="default-container">

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
          <b-form-rating id="rating-10" v-model="movie.vote_average" readonly show-value stars="10"/>
        </template>

      </b-card>
    </b-card-group>

    <pre>
      {{movies}}
    </pre>
  </b-container>
</template>

<script>
export default {
  name: "Catálogo",

  data() {
    return {
      movies: []
    }
  },

  methods: {
    async getMovies() {
      await this.$axios.$get("/movie/popular", {params: process.env.paramsUrl}).then((response) => {
        this.movies = response.results
      }).catch((error) => {
        this.$toast.error("Erro:" + error)
      })
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
