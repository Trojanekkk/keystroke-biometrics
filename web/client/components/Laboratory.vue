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
      5. Do not correct mistakes (neither just ater you make it either when you finish rewriting), do not worry about them, just continue rewriting.
    </p>
    <h5>Rewrite given text to the field below ({{ archive.length > 2 ? 'english language phase' : 'native language phase' }})</h5>
    <p
      v-if="archive.length <= 2"
    >
      // TEXT IN NATIVE //
    </p>
    <p
      v-if="archive.length > 2 && archive.length <= 5"
    >
      // TEXT IN ENGLISH //
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
    <!-- <div
      @click="exportResults()"
    >
      Export
    </div> -->
    <p
      v-if="archive.length < 6"
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
      <center>Finished {{ archive.length }} / 6</center>
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
        keydownsDiff: [],
        keyups: []
      },
      archive: []
    }
  },
  mounted () {
    this.dispatchTexts()
  },
  methods: {
    dispatchTexts () {
      //
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
        keydownsDiff: [],
        keyups: []
      }
    },
    exportResults () {
      const text = JSON.stringify(this.results)
      const filename = 'nativePhase'
      const el = document.createElement('a')

      el.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text))
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
#laboratory {
  background-color: $main-color;
  box-shadow: 0 0 1rem -.6rem black;
  margin: 10rem 25%;
  padding: 2rem 3rem;
  position: relative;
  width: 50%;
}
</style>
