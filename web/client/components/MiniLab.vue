<template>
  <div id="mini_laboratory">
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
        <b-form-textarea
          v-model="results.text"
          rows="10"
          :disabled="archive.length > 0"
          @keydown="capturePressing($event)"
          @keyup="captureReleasing($event)"
        />
      </p>
      <p
        v-if="archive.length < 1"
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
          :disabled="invalid"
        >
          Finish the experiment & Send results
        </b-button>
      </p>
      <p>
        <center>Finished steps {{ archive.length }} / 1</center>
        <br>
        <b-progress style="background-color: white" :value="archive.length" max="1" variant="danger" animated />
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
