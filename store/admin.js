import mutations from './modules/admin/mutations'
import actions from './modules/admin/actions'
import getters from './modules/admin/getters'

export const state = () => ({
  users: null,
  currentUserInfos: null,
  currentUserReservations: null,
  userCreateInfos: null,
  success: null,
  successMessage: null,
  error: null,
  errorMessage: null
})

export { mutations }
export { actions }
export { getters }
