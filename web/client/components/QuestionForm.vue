<template>
  <div id="question-form">
    <h5>The experiment description</h5>
    <p>
      Nullam sagittis nibh nulla, a dictum orci porta sed. Praesent metus ante, luctus ac lorem non, mollis pellentesque risus. Duis placerat velit vitae rhoncus interdum. Curabitur arcu purus, condimentum et semper eu, vulputate non turpis. Aenean quis auctor metus, et imperdiet est. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ac vulputate ligula, id facilisis mi. Sed sit amet urna id sem hendrerit fermentum a eu mauris. Cras ultricies volutpat lorem mollis pretium. Maecenas at elit et nibh tincidunt euismod. Quisque vel magna pharetra ligula posuere vestibulum ut et nibh. Morbi semper tristique dapibus. Nullam vel consequat mauris.
    </p>
    <h5>Questionnaire</h5>
    <p />
    <b-form>
      <p>
        Name / Nickname (for identification) <span style="color: red">*</span><br>
        <b-form-input v-model="userData.nickname" placeholder="John Doe" required />
      </p>
      <p>
        E-mail address (if you want to receive the research results later)<br>
        <b-form-input v-model="userData.email" placeholder="john.doe@example.com" required />
      </p>
      <p>
        Choose your native language <span style="color: red">*</span><br>
        <b-form-select v-model="userData.nativeLanguage" :options="availableLanguages" />
      </p>
      <p>
        Determine yours ENGLISH skill level (choose NATIVE if english is your native language) <span style="color: red">*</span><br>
        <b-form-select v-model="userData.skill" :options="skillOptions" />
      </p>
      <p>
        How frequent do you write in ENGLISH language during last month? <span style="color: red">*</span><br>
        <b-form-select v-model="userData.frequency" :options="frequencyDescription" />
      </p>
      <br>
      <b-button
        variant="danger"
        @click="submitQuestionnaire(); $router.push('/experiment')"
      >
        Save data & Launch experiment
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        nickname: '',
        email: '',
        nativeLanguage: '',
        skill: 0,
        frequency: 0
      },
      availableLanguages: [
        { value: 'en', text: 'English' },
        { value: 'de', text: 'German' },
        { value: 'gr', text: 'Greek' },
        { value: 'it', text: 'Italian' },
        { value: 'pl', text: 'Polish' },
        { value: 'gr', text: 'Spanish' }
      ],
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
  methods: {
    submitQuestionnaire () {
      // TODO validation, avoid leaving empty fields
      this.$store.commit('saveQuestionnaire', this.userData)
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
</style>
