export default {
  setConnectionInfos(state, payload) {
    state.email = payload.email;
    state.password = payload.password;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setErrorMessage(state, payload) {
    state.errorMessage = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setUserInfos(state, payload) {
    state.userInfos = payload;
  },
  loadUserReservations(state, payload) {
    state.userReservations = payload
  },
  setUserReservations(state, payload) {
    if (state.userReservations) {
      const newReservationsList = state.userReservations.filter(
        (item) => {
          if (item.idReservation === payload) {
            item.show = !item.show;
          }
          return true;
        }
      );

      state.userReservations = newReservationsList;
    } else {
      state.userReservations = null;
    }
  },
  setConnected(state, payload) {
    state.connected = payload;
  },
  setExpirationDate(state, payload) {
    state.expirationDate = payload;
  },
};
