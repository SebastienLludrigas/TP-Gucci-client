export default {
  connectionInfos (state) {
    return {
      email: state.email,
      password: state.password
    }
  },
  token (state) {
    return state.token
  },
  errorMessage (state) {
    return state.errorMessage
  },
  error (state) {
    return state.error
  },
  userInfos (state) {
    return state.userInfos
  },
  userReservations (state) {
    return state.userReservations
  },
  connected (state) {
    return state.connected
  },
  expirationDate(state) {
    return state.expirationDate
  }
}
