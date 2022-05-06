<template>
  <b-container class="default-container">
    <b-row class="my-5">
      <b-col>
        <div><span><strong>Nome:</strong> {{ user.profile.name }}</span></div>
        <div><span><strong>Email:</strong> {{ user.email }}</span></div>
      </b-col>
    </b-row>
    <hr>

    <b-row class="mt-5">
      <b-col><h2 class="text-center"><strong>Favoritos</strong></h2></b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <h4 v-if="!user.profile.favorite_ids.length" class="text-center">Não há favoritos...</h4>
        <lista-filmes v-else :movies-ids="user.profile.favorite_ids" :container-view="false"/>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import ListaFilmes from "@/components/ListaFilmes";

export default {
  components: {
    'lista-filmes': ListaFilmes
  },

  data() {
    return {
      user: this.$store.state.auth.user
    }
  }
}
</script>

<style scoped>

</style>
