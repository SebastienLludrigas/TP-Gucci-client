/* eslint-disable no-console */
export default {
  applications (state) {
    return state.applications
  },
  couloirs (state) {
    return state.couloirs
  },
  platforms (state) {
    return state.platforms
  },
  globalState (state) {
    console.log(state)
  },
  arrayWeeks (state) {
    return state.weeksList
  },
  arrayDays (state) {
    return state.daysList
  },
  partialSelectionApp (state) {
    return state.partialSelectionApp
  },
  selectionApp (state) {
    return state.selectionApp
  },
  couloirChecked (state) {
    return state.couloirChecked
  },
  permanentApplications (state) {
    return state.permanentApplications
  },
  permanentAppPlCo (state) {
    return state.permanentAppPlCo
  },
  permanentCouloirs (state) {
    return state.permanentCouloirs
  },
  infoCouloir (state) {
    return state.infoCouloir
  },
  displaySpinner (state) {
    return state.displaySpinner
  },
  nbReload (state) {
    return state.nbReload
  },
  resetScrollTop (state) {
    return state.resetScrollTop
  }
}
