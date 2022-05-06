<template>
  <filme :id="parseInt($route.params.id)" />
</template>

<script>
import Filme from "@/components/Filme";

export default {
  components: {
    filme: Filme
  },
}
</script>

<style scoped>

</style>
