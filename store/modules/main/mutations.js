import { weeksAndDays, coPlAndRowspan } from '../../../utils'

export default {
  setApplications (state, payload) {
    state.applications = payload
  },
  setPlatforms (state, payload) {
    state.platforms = payload
  },
  setDateBox (state, payload) {
    state.daysList = weeksAndDays(payload.start, payload.end).daysList
    state.weeksList = weeksAndDays(payload.start, payload.end).weeksList
  },
  setPartialSelectionApp (state, payload) {
    state.partialSelectionApp = coPlAndRowspan(payload)
  },
  setSelectionApp (state, payload) {
    state.selectionApp = coPlAndRowspan(payload)
  },
  setCouloirs (state, payload) {
    state.couloirs = payload
  },
  setCouloirChecked (state, payload) {
    state.couloirChecked = payload
  },
  setPermanentAppPlCo (state, payload) {
    state.permanentAppPlCo = payload
  },
  setPermanentApplications (state, payload) {
    state.permanentApplications = payload
  },
  setPermanentCouloirs (state, payload) {
    state.permanentCouloirs = payload
  },
  setInfoCouloir (state, payload) {
    state.infoCouloir = payload
  },
  loadInfosResas (state, payload) {
    state.infosResas = payload
  },
  setArrayDaysForCells (state, payload) {
    state.arraysDaysForCells = payload
  },
  setDisplaySpinner (state, payload) {
    state.displaySpinner = payload
  },
  setNbReload (state, payload) {
    state.nbReload = payload
  },
  setResetScrollTop (state, payload) {
    state.resetScrollTop = payload
  }
}
