<template>
  <div id="container">
    <About />
    <Navbar />
    <QuestionForm />
    <Footer style="bottom: 0" />
  </div>
</template>

<script>
export default {
  mounted () {
    this.avoidFirefox()
    this.$bvModal.show('modal-about')
  },
  methods: {
    avoidFirefox () {
      this.$store.commit('saveUserAgent', navigator.userAgent)
      if (navigator.userAgent.includes('Firefox')) {
        alert('Firefox browser is not full compatible with the research environment. Please change your browser before you run the experiment. We recommend Google Chrome for that case.\n\nThank you!')
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
