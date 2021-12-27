export const state = () => ({
  userAgent: '',
  userData: null
})

export const mutations = {
  saveUserAgent (state, userAgent) {
    state.userAgent = userAgent
  },
  saveQuestionnaire (state, userData) {
    state.userData = userData
  }
}
