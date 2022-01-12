<template>
  <div id="laboratory">
    <h5>A few rules reminder</h5>
    <p>
      1. Before you start 1st (native language) and 3rd (english language) phases, read once slowly and cerfully the whole text.
    </p>
    <p>
      2. Of course, you can read the text during rewriting, the text will be visible all the experiment.
    </p>
    <p>
      3. Do not be in a hurry with rewriting, try to do it naturally in you normal speed.
    </p>
    <p>
      4. Try to do not make breaks, focus on the rewriting (If you really need a break, take it when you finish 3 steps of 6).
    </p>
    <p>
      5. Do not correct mistakes (neither just ater you make it either when you finish rewriting), do not worry about them, just continue rewriting and jump to the next step.
    </p>
    <p>
      6. Do not forget to send the results when you finish.
    </p>
    <p>
      7. Do not refresh the page, all results and data will be erased.
    </p>
    <h5>Rewrite given text to the field below ({{ archive.length > 2 ? 'english language phase' : 'native language phase' }})</h5>
    <p>
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-card>
            <p><b-skeleton /></p>
            <p><b-skeleton /></p>
            <p><b-skeleton /></p>
            <p><b-skeleton /></p>
            <p><b-skeleton /></p>
            <b-skeleton width="75%" />
          </b-card>
        </template>
        <b-card
          style="user-select: none"
        >
          {{ archive.length > 2 ? texts.englishText : texts.nativeText }}
        </b-card>
      </b-skeleton-wrapper>
    </p>
    <p>
      <b-form-textarea
        v-model="results.text"
        rows="10"
        :disabled="archive.length > 5"
        @keydown="capturePressing($event)"
        @keyup="captureReleasing($event)"
      />
    </p>
    <p
      v-if="archive.length < 6"
    >
      <br>
      <b-button
        variant="danger"
        @click="nextStep()"
      >
        Next phase
      </b-button>
    </p>
    <p
      v-else
    >
      <br>
      <b-button
        variant="danger"
        @click="sendResults()"
      >
        Finish the experiment & Send results
      </b-button>
    </p>
    <p>
      <center>Finished phases {{ archive.length }} / 6</center>
      <b-progress style="background-color: white" :value="archive.length" max="6" variant="danger" animated />
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      results: {
        text: '',
        keydowns: [],
        keyups: []
      },
      archive: [],
      loading: true,
      textToRewrite: '',
      texts: {
        nativeText: '',
        englishText: ''
      }
    }
  },
  mounted () {
    this.dispatchTexts()
  },
  methods: {
    async dispatchTexts () {
      if (this.$store.state.userData === null) { return }
      const nativeLang = this.$store.state.userData.nativeLanguage
      const nativeText = await this.$axios.$get('/api/v1/text?lang=' + nativeLang)
      const englishText = await this.$axios.$get('/api/v1/text?lang=en')
      this.texts = { nativeText, englishText }
      this.loading = false
    },
    capturePressing (event) {
      const d = new Date()
      this.results.keydowns.push({
        c: event.key,
        t: event.timeStamp,
        d: d.getTime(),
        p: performance.now()
      })
    },
    captureReleasing (event) {
      const d = new Date()
      this.results.keyups.push({
        c: event.key,
        t: event.timeStamp,
        d: d.getTime(),
        p: performance.now()
      })
    },
    nextStep () {
      this.archive.push(this.results)
      this.results = {
        text: '',
        keydowns: [],
        keyups: []
      }
    },
    async sendResults () {
      const userAgent = this.$store.state.userAgent
      const userData = this.$store.state.userData
      const results = this.archive
      await this.$axios.$post('/api/v1/result', { userAgent, userData, results })
        .then((res) => {
          this.$store.commit('saveUserResults', this.archive)
          this.$store.commit('updateDeliveryStatus', res)
          this.$router.push('/summary')
        })
    }
  }
}
</script>

<style lang="scss">
#laboratory {
  background-color: $main-color;
  box-shadow: 0 0 1rem -.6rem black;
  margin: 10rem 25%;
  padding: 2rem 3rem;
  position: relative;
  width: 50%;
}
</style>
