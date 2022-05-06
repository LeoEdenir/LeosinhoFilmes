<template>
  <lista-filmes movies-url="/discover/movie" :additional-params="{with_genres: this.$route.params.id}"/>
</template>

<script>

export default {
}
</script>

<style scoped>

</style>
