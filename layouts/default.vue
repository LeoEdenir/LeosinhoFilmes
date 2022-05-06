<template>
  <div>
    <section v-if="isDefaultPage">
      <navbar />
      <img
        class='background'
        src='../static/images/catalogo-background.jpg'
        alt='cinema' />
    </section>
    <Nuxt />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    navbar: Navbar,
  },

  data() {
    return {
      notDefaultPages: ['login', 'cadastro']
    }
  },

  computed: {
    isDefaultPage() {
      return !this.notDefaultPages.includes(this.$route.name)
    }
  }
}
</script>

<style scoped>
.background {
  background: url('../static/images/catalogo-background.jpg') no-repeat center center fixed;

  position: fixed;
  top: 0;
  left: 0;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;

  z-index: -1;
}
</style>
