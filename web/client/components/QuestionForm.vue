<template>
  <div id="question-form">
    <h5>From the author</h5>
    <p />
    <i>
      <p>
        Hello!
      </p>
      <p>
        Since you're here, it means you have agreed to participate in a scientific
        experiment that I am conducting as part of my master's thesis :)
      </p>
      <p>
        The experiment, in short, involves transcribing two texts (about 250
        characters each) - one of the texts will be in your native language
        (Polish), and the other will be in the English language. The experiment
        aims to examine the differences in the way you interact with the keyboard
        depending on the language you use. The results of this research (analysis,
        not just samples! So you don't have to worry about anything) may
        contribute to the development of future digital security systems.
      </p>
      <p>
        The topic is extensive, and I modestly believe it to be quite interesting.
        If you're interested in learning more, I have prepared a longer
        description for you - click on the <b>i</b> button in the top right corner of
        the screen.
      </p>
      <p>
        Thank you very much for your willingness to participate in the experiment!
      </p>
      <p>
        Good luck! <br>
        Wojciech Trojanowski
      </p>
    </i>
    <h5><br>Preparation</h5>
    <p />
    <p>
      The entire process should not take more than 15 minutes, but
      please make sure you have at least that amount of time to dedicate fully to
      this experiment - any distractions can affect the results, just as rushing
      through it can... Furthermore, the experiment is designed to be conducted
      only on laptops or desktop computers. If you accessed it from a mobile
      device, please switch to a laptop/desktop computer. <br> One more important
      detail - we will obtain the most accurate results if you use a keyboard
      that you are habituated to.
    </p>
    <p>
      Start by filling out the short survey below (solely for statistical
      purposes). Then, you will be redirected to the actual experiment page,
      where you will find detailed instructions on what to do. Please take your
      time and approach the experiment with a relaxed and curious mindset :)
    </p>
    <h5><br>Questionnaire</h5>
    <p />
    <ValidationObserver v-slot="{ invalid }">
      <b-form @submit.prevent="submitQuestionnaire()">
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
          E-mail address (if you want to receive the research results later)<br>
          <ValidationProvider v-slot="{ errors }" rules="email|max:100">
            <b-form-input
              v-model="userData.email"
              placeholder="john.doe@example.com"
            />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          Choose your native language <span style="color: red">*</span><br>
          <ValidationProvider
            v-slot="{ errors }"
            name="userData.nativeLanguage"
            rules="required"
          >
            <b-form-select
              v-model="userData.nativeLanguage"
              :options="availableLanguages"
            />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          Determine yours ENGLISH skill level (choose NATIVE if english is your
          native language) <span style="color: red">*</span><br>
          <ValidationProvider
            v-slot="{ errors }"
            name="userData.skill"
            rules="required"
          >
            <b-form-select v-model="userData.skill" :options="skillOptions" />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          How frequent do you write in ENGLISH language during last month?
          <span style="color: red">*</span><br>
          <ValidationProvider
            v-slot="{ errors }"
            name="userData.frequency"
            rules="required"
          >
            <b-form-select
              v-model="userData.frequency"
              :options="frequencyDescription"
            />
            <span class="vee-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <br>
        <span id="popover-target-2" style="display: inline-block">
          <b-button :disabled="invalid" variant="danger" type="submit">
            Save data & Launch experiment
          </b-button>
        </span>
        <b-popover
          target="popover-target-2"
          triggers="hover"
          placement="bottom"
          :disabled="!invalid"
          :hide="!invalid"
        >
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
  box-shadow: 0 0 1rem -0.6rem black;
  margin: 10rem 25%;
  padding: 2.5rem 3rem;
  width: 50%;
}

.vee-error {
  color: $accent;
  font-size: 0.8rem;
  font-weight: 300;
}
</style>
