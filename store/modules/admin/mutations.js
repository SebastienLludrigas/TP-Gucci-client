export default {
  loadUsers (state, payload) {
    state.users = payload
  },
  loadCurrentUserInfos (state, payload) {
    state.currentUserInfos = payload;
    state.currentUserReservations = payload.reservations;
    console.log(payload.reservations)
  },
  setCurrentUserReservations (state, payload) {
    const newArray = state.currentUserReservations.filter(el => {
      if (el.idReservation === payload) el.show = !el.show;
      return true;
    });

    state.currentUserReservations = newArray;
  },
  setUserCreateInfos (state, payload) {
    state.userCreateInfos = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setErrorMessage (state, payload) {
    state.errorMessage = payload
  },
  setSuccess (state, payload) {
    state.success = payload
  },
  setSuccessMessage (state, payload) {
    state.successMessage = payload
  }
}