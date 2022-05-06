<template>
  <div class="mb-5">
    <b-navbar sticky toggleable="md" type="dark" variant="dark">
      <b-navbar-brand to="/catalogo">LeosinhoFilmes</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">

            <b-nav-item-dropdown text="Gêneros">
              <b-dropdown-item
                v-for="genre in genres"
                :key="genre.id"
                :to="getGenreLink(genre)">
                {{ genre.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>

          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item to="/perfil">Perfil</b-dropdown-item>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      genres: []
    }
  },

  created() {
    this.getGenres()
  },

  methods: {
    async getGenres() {
      await this.$axios.$get("/genre/movie/list", {params: process.env.paramsUrl}).then((response) => {
        this.genres = response.genres
      })
    },
    getGenreLink(genre) {
      return `/genero/${genre.id}`
    },
    async logout() {
      await this.$router.push('/login')
      await this.$fire.auth.signOut();
      await this.$store.dispatch("auth/setUser", null);
    }
  }
}
</script>

<style scoped>

</style>
