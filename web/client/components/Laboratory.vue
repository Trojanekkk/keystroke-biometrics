<template>
  <div id="laboratory">
    <h5><br>A few rules before you start</h5>
    <p />
    <p>
      1. Before you start 1st (native language) and 4rth (english language) phase, read the whole text slowly and cerfully. Pay extra attention to spelling.
    </p>
    <p>
      2. Of course, you can read the text during rewriting, the text will be visible all the experiment.
    </p>
    <p>
      3. Do not be in a hurry with rewriting, try to do in natural matter, in you normal speed.
    </p>
    <p>
      4. Try to avoid longer breaks, focus on the rewriting (If you really need a break, take it when you finished 4th of 8 steps).
    </p>
    <p>
      5. Do not correct mistakes (neither just ater you make it either when you finished particular step), do not worry about them, just continue rewriting and jump to the next step.
    </p>
    <p>
      6. Do not forget to send the results as you finished.
    </p>
    <p>
      7. Please do not refresh the page during the assesment - all results and data will be lost.
    </p>
    <h5><br>Rewrite given text to the field below ({{ archive.length > 2 ? 'english language phase' : 'native language phase' }})</h5>
    <p />
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
        :disabled="archive.length > 7"
        @keydown="capturePressing($event)"
        @keyup="captureReleasing($event)"
      />
    </p>
    <p
      v-if="archive.length < 8"
    >
      <br>
      <b-button
        variant="danger"
        @click="nextStep()"
      >
        Next step
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
      <center>Finished steps {{ archive.length }} / 8</center>
      <br>
      <b-progress style="background-color: white" :value="archive.length" max="8" variant="danger" animated />
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
      // const d = new Date()
      const p = performance.now()
      this.results.keydowns.push({
        c: event.key,
        // t: event.timeStamp,
        // d: d.getTime(),
        p
      })
    },
    captureReleasing (event) {
      // const d = new Date()
      const p = performance.now()
      this.results.keyups.push({
        c: event.key,
        // t: event.timeStamp,
        // d: d.getTime(),
        p
      })
    },
    nextStep () {
      this.archive.push(this.results)
      console.log(this.archive)
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
