<template>
  <div id="summary">
    <h5>Thank you for the partcipation!</h5>
    <p>
      {{ text }}
    </p>
    <p>
      <br>
      <b-button
        v-if="!delivered"
        variant="danger"
        @click="sendResults()"
      >
        Retry
      </b-button>
    </p>
    <p>
      <br>
      <b-button
        variant="danger"
        @click="exportResults()"
      >
        Export results
      </b-button>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      delivered: null,
      text: ''
    }
  },
  mounted () {
    this.checkDeliveryConfirmation()
  },
  methods: {
    checkDeliveryConfirmation () {
      this.delivered = this.$store.state.deliveryStatus
      if (this.delivered === false) {
        this.text = 'Some problem with the server occured, please retry or export the results and send them on email: <a href="mailto:W.Trojan27@gmail.com">W.Trojan27@gmail.comx`</a>'
      } else if (this.delivered === null) {
        this.text = 'Some unrecognized problem occured, please retry or export the results and send them on email: W.Trojan27@gmail.com'
      } else {
        this.text = 'The results of the experiment have been received by the server.'
      }
    },
    exportResults () {
      const results = this.$store.state
      const resultsJSON = JSON.stringify(results)
      const filename = 'experimentResults'
      const el = document.createElement('a')

      el.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(resultsJSON))
      el.setAttribute('download', filename)
      el.style.display = 'none'

      document.body.appendChild(el)
      el.click()
      document.body.removeChild(el)
    }
  }
}
</script>

<style lang="scss">
#summary {
  background-color: $main-color;
  box-shadow: 0 0 1rem -.6rem black;
  margin: 10rem 25%;
  padding: 2rem 3rem;
  width: 50%;
}
</style>
