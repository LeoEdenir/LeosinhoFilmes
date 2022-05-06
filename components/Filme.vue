<template>
  <b-container class="default-container">
    <pre>
      {{movie}}
    </pre>
  </b-container>
</template>

<script>
export default {
  name: "Filme",

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      movie: {

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
  },

  mounted() {
    this.getMovie(this.id)
  }
}
</script>

<style scoped>

</style>
