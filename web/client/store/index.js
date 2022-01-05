export const state = () => ({
  deliveryStatus: null,
  userAgent: '',
  userData: null
})

export const mutations = {
  updateDeliveryStatus (state, deliveryStatus) {
    state.deliveryStatus = deliveryStatus
  },
  saveUserAgent (state, userAgent) {
    state.userAgent = userAgent
  },
  saveQuestionnaire (state, userData) {
    state.userData = userData
  }
}
