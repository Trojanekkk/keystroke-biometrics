<template>
  <div id="container">
    <About />
    <Navbar />
    <QuestionForm />
    <Laboratory />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$bvModal.show('modal-about')
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;800&display=swap');

body {
  font-family: 'Open Sans', sans-serif;
}
</style>
