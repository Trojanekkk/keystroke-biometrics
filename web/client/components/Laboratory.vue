<template>
  <div id="laboratory">
    <div
      v-if="archive.length <= 2"
    >
      // TEXT IN NATIVE //
    </div>
    <div
      v-if="archive.length > 2 && archive.length <= 5"
    >
      // TEXT IN ENGLISH //
    </div>
    <p>
      <b-form-textarea
        v-model="results.text"
        @keydown="capturePressing($event)"
        @keyup="captureReleasing($event)"
      />
    </p>
    <!-- <div
      @click="exportResults()"
    >
      Export
    </div> -->
    <br>
    <b-button
      variant="danger"
      @click="nextStep()"
    >
      Next step
    </b-button>
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
  methods: {
    capturePressing (event) {
      this.results.keydowns.push({ c: event.key, t: event.timeStamp })
    },
    captureReleasing (event) {
      this.results.keyups.push({ c: event.key, t: event.timeStamp })
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
  width: 50%;
}
</style>
