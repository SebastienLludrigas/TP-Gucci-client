import reservations from '../data/reservation'
import mutations from './modules/reservation/mutations'
import actions from './modules/reservation/actions'
import getters from './modules/reservation/getters'

export const state = () => ({
  reservations,
  startReservation: false,
  displayModalForm: false,
  displayModalFormUpdate: false,
  displayModalResaSummary: false,
  displayModalResaConfirmation: false,
  displayModalResaInfo: false,
  displayModalUpdate: false,
  displayModalDelete: false,
  createError: false,
  updateError: false,
  errorMessage: null,
  deleteName: '',
  deletionType: '',
  deleteInfos: null,
  deleteError: false,
  valueToUpdate: null,
  newValueForUpdate: null,
  currentReservationApplications: null,
  currentReservationId: null,
  updateIntitule: false,
  updateComments: false,
  updateDateDebut: false,
  updateDateFin: false,
  confirmationMessage: '',
  responseCreatedResaMessage: '',
  responseCreatedResaIsCreated: false,
  reservationInfo: {
    start: '2021-05-29',
    end: '2021-05-29',
    selection: [
      {
        borderAppBottom: true,
        borderAppTop: true,
        borderCellTop: true,
        couloirRowspan: '4',
        displayCouloir: true,
        displayPlatform: true,
        id: 64,
        id_couloir: 3,
        id_plateforme: 51,
        nom_application: 'admingw',
        nom_couloir: 'GIIN-C02',
        nom_plateforme: 'MEDSER',
        platformRowspan: '1'
      },
      {
        borderAppBottom: true,
        borderAppTop: true,
        displayPlatform: true,
        id: 132,
        id_couloir: 3,
        id_plateforme: 72,
        nom_application: 'annabelbe',
        nom_couloir: 'GIIN-C02',
        nom_plateforme: 'TLDP',
        platformRowspan: '1'
      },
      {
        borderAppBottom: true,
        borderAppTop: true,
        displayPlatform: true,
        id: 97,
        id_couloir: 3,
        id_plateforme: 39,
        nom_application: 'adminsx5',
        nom_couloir: 'GIIN-C02',
        nom_plateforme: 'POP',
        platformRowspan: '1'
      },
      {
        borderAppBottom: true,
        borderAppTop: true,
        borderCellBottom: true,
        displayPlatform: true,
        id: 75,
        id_couloir: 3,
        id_plateforme: 42,
        nom_application: 'ancre',
        nom_couloir: 'GIIN-C02',
        nom_plateforme: 'PANCRE',
        platformRowspan: '1'
      }
    ]
  },
  infosResas: {},
  infosResaModal: {}
})

export { mutations }
export { actions }
export { getters }
