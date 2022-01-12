export const state = () => ({
  deliveryStatus: null,
  userAgent: '',
  userData: null,
  userResults: null
})

export const mutations = {
  updateDeliveryStatus (state, deliveryStatus) {
    state.deliveryStatus = deliveryStatus
  },
  saveUserAgent (state, userAgent) {
    state.userAgent = userAgent
  },
  saveUserResults (state, userResults) {
    state.userResults = userResults
  },
  saveQuestionnaire (state, userData) {
    state.userData = userData
  }
}
