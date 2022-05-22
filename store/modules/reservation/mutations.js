export default {
  setStartReservation (state, payload) {
    state.startReservation = payload
  },
  setDisplayModalForm (state, payload) {
    state.displayModalForm = payload
  },
  setDisplayModalFormUpdate (state, payload) {
    state.displayModalFormUpdate = payload
  },
  setDisplayModalResaSummary (state, payload) {
    state.displayModalResaSummary = payload
  },
  setDisplayModalResaConfirmation (state, payload) {
    state.displayModalResaConfirmation = payload
  },
  setDisplayModalResaInfo (state, payload) {
    state.displayModalResaInfo = payload
  },
  setDisplayModalUpdate (state, payload) {
    state.displayModalUpdate = payload
  },
  setDisplayModalDelete (state, payload) {
    state.displayModalDelete = payload
  },
  setConfirmationMessage (state, payload) {
    state.confirmationMessage = payload
  },
  setErrorMessage (state, payload) {
    state.errorMessage = payload
  },
  setCreateError (state, payload) {
    state.createError = payload
  },
  setUpdateError (state, payload) {
    state.updateError = payload
  },
  setDeleteError (state, payload) {
    state.deleteError = payload
  },
  setDeleteName (state, payload) {
    state.deleteName = payload
  },
  setDeletionType (state, payload) {
    state.deletionType = payload
  },
  setDeleteInfos (state, payload) {
    state.deleteInfos = payload
  },
  setValueToUpdate (state, payload) {
    state.valueToUpdate = payload
  },
  setNewValueForUpdate (state, payload) {
    state.newValueForUpdate = payload
  },
  setCurrentReservationApplications (state, payload) {
    state.currentReservationApplications = payload
  },
  setCurrentReservationId (state, payload) {
    state.currentReservationId = payload
  },
  setUpdateIntitule (state, payload) {
    state.updateIntitule = payload
  },
  setUpdateComments (state, payload) {
    state.updateComments = payload
  },
  setUpdateDateDebut (state, payload) {
    state.updateDateDebut = payload
  },
  setUpdateDateFin (state, payload) {
    state.updateDateFin = payload
  },
  setInfoResa (state, payload) {
    state.reservationInfo.intitule = payload.intitule
    state.reservationInfo.comments = payload.comments
    state.reservationInfo.id_habilite = payload.id_habilite
    state.reservationInfo.start = payload.start
    state.reservationInfo.end = payload.end
    state.reservationInfo.selection = payload.selection
  },
  loadInfosResas (state, payload) {
    state.infosResas = payload
  },
  setInfosResaModal (state, payload) {
    state.infosResaModal = payload
  }
}
