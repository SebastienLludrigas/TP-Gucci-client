// import { coPlAndRowspan } from '../utils'

import mutations from './modules/main/mutations'
import getters from './modules/main/getters'

export const state = () => ({
  weeksList: {},
  daysList: {},
  appPlCo: [],
  permanentApplications: [],
  permanentAppPlCo: [],
  permanentCouloirs: [],
  partialSelectionApp: [],
  selectionApp: [],
  nbReload: 1,
  resetScrollTop: false,
  applications: [],
  couloirs: [],
  couloirChecked: false,
  applicationChecked: false,
  displaySpinner: false
})

export { mutations }
export { getters }

export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
    console.log('nuxtServerInit is running')
    await dispatch('loadAppPlCo');
    await dispatch('reservation/loadInfosResas');
    await dispatch('loadApplications');
    await dispatch('loadCouloirs');
  },
  async loadApplications (context) {
    const response = await fetch('http://localhost:3000/main/applications')
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch !')
      throw error
    }

    const idApplications = []
    responseData.applications.forEach((item) => {
      idApplications.push(item.id_application)
    })

    context.commit('setApplications', responseData.applications)
    context.commit('setPermanentApplications', responseData.applications)
  },

  async loadCouloirs (context) {
    const response = await fetch('http://localhost:3000/main/couloirs')
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch !')
      throw error
    }

    const idCouloirs = []
    responseData.couloirs.forEach((item) => {
      idCouloirs.push(item.id_couloir)
    })

    context.commit('setCouloirs', responseData.couloirs)
    context.commit('setPermanentCouloirs', responseData.couloirs)
  },

  async loadPlatforms (context) {
    const response = await fetch('http://localhost:3000/main/platforms')
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch !')
      throw error
    }
    context.commit('setPlatforms', responseData.platforms)
  },

  async loadAppPlCo (context) {
    const response = await fetch('http://localhost:3000/main/applications_platforms_couloirs')

    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch !')
      throw error
    }

    context.commit('setSelectionApp', responseData.appPlCo)
    context.commit('setPartialSelectionApp', responseData.appPlCo.filter((_, index) => index < 50))
    context.commit('setPermanentAppPlCo', responseData.appPlCo)
  }
}
