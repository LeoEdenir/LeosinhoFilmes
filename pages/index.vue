<template>
</template>

<script>


export default {
  name: 'IndexPage',
  beforeCreate() {
    if (this.$store.state.auth.user) {
      return this.$router.push('/catalogo')
    } else {
      return this.$router.push('/login')
    }
  }
}
</script>
