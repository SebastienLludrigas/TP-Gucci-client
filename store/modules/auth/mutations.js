import dayjs from 'dayjs'

export default {
  setConnectionInfos (state, payload) {
    state.email = payload.email
    state.password = payload.password
  },
  setToken (state, payload) {
    state.token = payload
  },
  setErrorMessage (state, payload) {
    state.errorMessage = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setUserInfos (state, payload) {
    state.userInfos = payload
  },
  setInitialUserReservations (state, payload) {
    if (payload) {
      const resasUser = payload.map(item => (
        {
          ...item,
          dateDebutReservation: dayjs(item.dateDebutReservation).format('DD/MM/YYYY'),
          dateFinReservation: dayjs(item.dateFinReservation).format('DD/MM/YYYY'),
          show: false
        }
      ))
      state.userReservations = resasUser
    } else {
      state.userReservations = null
    }
  },
  setUserReservations (state, payload) {
    if (state.userReservations) {
      const newReservationsList = state.userReservations.filter((item) => {
        if (item.idReservation === payload) {
          item.show = !item.show
        }
        return true
      })

      // this.reservationsList = newReservationsList
      // this.$store.commit('auth/setUserReservations', newReservationsList)
      state.userReservations = newReservationsList
    } else {
      state.userReservations = null
    }
  },
  setConnected (state, payload) {
    state.connected = payload
  }
}
