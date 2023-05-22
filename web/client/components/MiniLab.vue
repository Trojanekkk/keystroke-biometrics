<template>
  <div id="mini_laboratory">
    <h5><br>A few rules before you start</h5>
    <p />
    <p>
      1. Before you start, read the whole text slowly and cerfully. Pay extra attention to spelling.
    </p>
    <p>
      2. Of course, you can read the text during rewriting, the text will be visible during the whole experiment.
    </p>
    <p>
      3. Do not be in a hurry with rewriting, try to do in natural manner, in you normal speed.
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
    <h5><br>Rewrite given text to the field below</h5>
    <p />
    <ValidationObserver v-slot="{ invalid }">
      <p>
        Name / Nickname (for identification) <span style="color: red">*</span><br>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|alpha_spaces|max:100"
        >
          <b-form-input v-model="userData.nickname" placeholder="John Doe" />
          <span class="vee-error">{{ errors[0] }}</span>
        </ValidationProvider>
      </p>
      <p>
        <b-form-input :disabled="true" value="moja uczelnia jest spoko i studiuje na niej sporo studentów" />
      </p>
      <p>
        <b-form-textarea
          v-model="results.text"
          rows="10"
          :disabled="archive.length > numberOfSteps - 1"
          @keydown="capturePressing($event)"
          @keyup="captureReleasing($event)"
        />
      </p>
      <p
        v-if="archive.length < numberOfSteps"
      >
        <br>
        <b-button
          variant="success"
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
          variant="success"
          :disabled="invalid"
          @click="sendResults()"
        >
          Finish the experiment & Send results
        </b-button>
      </p>
      <p>
        <center>Finished steps {{ archive.length }} / {{ numberOfSteps }}</center>
        <br>
        <b-progress style="background-color: white" :value="archive.length" :max="numberOfSteps" variant="success" animated />
      </p>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      numberOfSteps: 3,
      userData: {
        nickname: ''
      },
      results: {
        text: '',
        keydowns: [],
        keyups: []
      },
      archive: [],
      loading: true
    }
  },
  methods: {
    capturePressing (event) {
      const p = performance.now()
      this.results.keydowns.push({
        c: event.key,
        p
      })
    },
    captureReleasing (event) {
      const p = performance.now()
      this.results.keyups.push({
        c: event.key,
        p
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
      const userAgent = navigator.userAgent
      const userData = this.userData
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
#mini_laboratory {
  background-color: $main-color;
  box-shadow: 0 0 1rem -.6rem black;
  margin: 10rem 25%;
  padding: 2rem 3rem;
  position: relative;
  width: 50%;
}
</style>
