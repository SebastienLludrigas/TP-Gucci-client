import mutations from './modules/auth/mutations'
import actions from './modules/auth/actions'
import getters from './modules/auth/getters'

export const state = () => ({
  email: 'sebastien.marin@acoss.fr',
  password: 'sebastienmarin',
  token: '',
  errorMessage: null,
  error: false,
  connected: false,
  userInfos: null,
  userReservations: null
})

export { mutations }
export { actions }
export { getters }
