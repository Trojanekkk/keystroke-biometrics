<template>
  <div id="container">
    <About />
    <Navbar />
    <Laboratory />
  </div>
</template>

<script>
export default {
  created () {
    this.forcePickingLanguage()
  },
  methods: {
    forcePickingLanguage () {
      if (this.$store.state.userData === null || this.$store.state.userData.nativeLanguage === '') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;800&display=swap');

body {
  font-family: 'Open Sans', sans-serif;
}
</style>
