<template>
  <div id="question-form">
    <h5>The experiment description</h5>
    <p>
      Nullam sagittis nibh nulla, a dictum orci porta sed. Praesent metus ante, luctus ac lorem non, mollis pellentesque risus. Duis placerat velit vitae rhoncus interdum. Curabitur arcu purus, condimentum et semper eu, vulputate non turpis. Aenean quis auctor metus, et imperdiet est. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ac vulputate ligula, id facilisis mi. Sed sit amet urna id sem hendrerit fermentum a eu mauris. Cras ultricies volutpat lorem mollis pretium. Maecenas at elit et nibh tincidunt euismod. Quisque vel magna pharetra ligula posuere vestibulum ut et nibh. Morbi semper tristique dapibus. Nullam vel consequat mauris.
    </p>
    <h5>Questionnaire</h5>
    <p />
    <ValidationObserver v-slot="{ invalid }">
      <b-form @submit.prevent="submitQuestionnaire()">
        <p>
          Name / Nickname (for identification) <span style="color: red">*</span><br>
          <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces|max:100">
            <b-form-input v-model="userData.nickname" placeholder="John Doe" />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          E-mail address (if you want to receive the research results later)<br>
          <ValidationProvider v-slot="{ errors }" rules="email|max:100">
            <b-form-input v-model="userData.email" placeholder="john.doe@example.com" />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          Choose your native language <span style="color: red">*</span><br>
          <ValidationProvider v-slot="{ errors }" name="userData.nativeLanguage" rules="required">
            <b-form-select v-model="userData.nativeLanguage" :options="availableLanguages" />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          Determine yours ENGLISH skill level (choose NATIVE if english is your native language) <span style="color: red">*</span><br>
          <ValidationProvider v-slot="{ errors }" name="userData.skill" rules="required">
            <b-form-select v-model="userData.skill" :options="skillOptions" />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          How frequent do you write in ENGLISH language during last month? <span style="color: red">*</span><br>
          <ValidationProvider v-slot="{ errors }" name="userData.frequency" rules="required">
            <b-form-select v-model="userData.frequency" :options="frequencyDescription" />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <br>
        <span id="popover-target-2" style="display: inline-block">
          <b-button
            :disabled="invalid"
            variant="danger"
            type="submit"
          >
            Save data & Launch experiment
          </b-button>
        </span>
        <b-popover target="popover-target-2" triggers="hover" placement="bottom" :disabled="!invalid" :hide="!invalid">
          Fill required fields before the submission
        </b-popover>
      </b-form>
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
        nickname: '',
        email: '',
        nativeLanguage: '',
        skill: null,
        frequency: null
      },
      availableLanguages: [],
      skillOptions: [
        { value: 1, text: 'B1' },
        { value: 2, text: 'B2' },
        { value: 3, text: 'C1' },
        { value: 4, text: 'C2' },
        { value: 5, text: 'NATIVE' }
      ],
      frequencyDescription: [
        { value: 1, text: 'I do NOT use an english language on daily basis' },
        { value: 2, text: 'I use an english language approximatly once a week' },
        { value: 3, text: 'I use an english language approximatly every 2-3 days' },
        { value: 4, text: 'I use an english language every day' }
      ]
    }
  },
  created () {
    this.retriveAvailableLanguages()
  },
  methods: {
    submitQuestionnaire () {
      // TODO validation, avoid leaving empty fields
      this.$store.commit('saveQuestionnaire', this.userData)
      this.$router.push('/experiment')
    },
    async retriveAvailableLanguages () {
      await this.$axios.get('/api/v1/text/languages')
        .then((res) => {
          this.availableLanguages = res.data
        })
    }
  }
}
</script>

<style lang="scss">
#question-form {
  background-color: $main-color;
  box-shadow: 0 0 1rem -.6rem black;
  margin: 10rem 25%;
  padding: 2rem 3rem;
  width: 50%;
}

.vee-error {
  color: $accent;
  font-size: .8rem;
  font-weight: 300;
}
</style>
