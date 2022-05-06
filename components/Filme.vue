<template>
  <b-container class="default-container">

    <b-row align-h="between" class="mb-3">
      <b-col cols="6">
        <h3><strong>{{ movie.title }}</strong>
            <a
              href='#'
              style='text-decoration: none;'
              @click.prevent="favoriteMovie">
              <b-icon :icon="isFavorite" variant="warning"></b-icon>
            </a>


<!--          <b-icon @click="favoriteMovie" :icon="isFavorite ? 'star' : 'star-fill'" variant="warning"></b-icon>-->
        </h3>
      </b-col>
      <b-col cols="5">
        <span>Votos: {{ movie.vote_count }}</span> /
        <span>Nota:
          <b-form-rating color="#ff8800" size="sm" readonly show-value stars="10" inline :value="movie.vote_average"/>
        </span>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card :img-src="getPosterPath()" img-alt="Poster" img-top class="mb-3">
          <b-card-text>
            <div class="mb-2">
              <b-badge
                v-for="genre in movie.genres"
                :key="genre.id"
                :to="getGenreLink(genre)"
                class="mr-1"
                pill
                variant="info">
                {{ genre.name }}
              </b-badge>
            </div>
            <div class="mb-2">
              <span><strong>Lançamento: </strong>{{ formatDate(movie.release_date) }}</span>
            </div>
            <div class="mb-2">
              <span><strong>Duração: </strong>{{ movie.runtime }} minutos</span>
            </div>
            <div class="mb-2">
              <h4><strong>Sinopse</strong></h4>
              {{ movie.overview }}
            </div>
            <div v-if="movie.homepage">
              <b-button
                variant="secondary"
                target="_blank"
                :href="movie.homepage">Visitar site</b-button>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { BIcon, BIconStar, BIconStarFill } from 'bootstrap-vue'

export default {
  name: "Filme",

  components: {
    BIcon,
    BIconStar,
    BIconStarFill
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      movie: {}
    }
  },

  computed: {
    isFavorite() {
      if (this.$store.state.auth.user.profile.favorite_ids.includes(this.movie.id)) {
        return 'star-fill'
      } else {
        return 'star'
      }
    }
  },

  methods: {
    async getMovie(id) {
      await this.$axios.$get(`/movie/${id}`, {params: process.env.paramsUrl}).then((response) => {
        this.movie = response
      }).catch((error) => {
        this.$toast.error("Erro:" + error)
      })
    },
    getPosterPath() {
      if (this.movie.backdrop_path) {
        return `http://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
      }
    },
    getGenreLink(genre) {
      return `/genero/${genre.id}`
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('pt-BR', options)
    },
    async favoriteMovie() {
      let isFavorite = false
      let favorite_ids = [...this.$store.state.auth.user.profile.favorite_ids]

      if (!favorite_ids.includes(this.movie.id)) {
        favorite_ids.push(this.movie.id);
      } else {
        const index = favorite_ids.indexOf(this.movie.id);
        favorite_ids.splice(index, 1)
        isFavorite = true
      }

      const profile = await this.$fire.firestore
        .collection("profile")
        .where("user_uid", "==", this.$store.state.auth.user.uid)
        .get();
      console.log(profile.docs[0].id)

      const updatedProfile = await this.$fire.firestore
        .collection("profile")
        .doc(profile.docs[0].id)
        .update({
          favorite_ids: favorite_ids
        }).then(await this.$store.dispatch("auth/setFavorites", favorite_ids))

      if (isFavorite) {
        return this.$toast.info("Filme retirado dos favoritos")
      }
      return this.$toast.info("Filme adicionado aos favoritos")
    }
  },

  mounted() {
    this.getMovie(this.id)
  }
}
</script>

<style scoped>

</style>
