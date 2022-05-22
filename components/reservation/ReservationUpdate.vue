<template>
  <section class="overlay">
    <div
      v-if="updateError"
      class="error"
    >
      <h3>{{ message }}<i class="fas fa-exclamation-circle" aria-hidden="true" /></h3>
    </div>
    <div
      v-if="!updateError"
      class="form-box"
    >
      <div
        v-if="updateIntitule"
        class="intitule"
      >
        <i class="fa fa-times" aria-hidden="true" @click="closeModal('intitule')" />
        <form @submit.prevent="submitForm">
          <label
            for="intitule"
          >
            Veuillez saisir le nouvel intitule
          </label>
          <input
            id="intitule"
            v-model.trim="intitule.value"
            type="text"
          >
          <button>
            Valider
          </button>
        </form>
      </div>
      <div
        v-if="updateComments"
        class="comments"
      >
        <i class="fa fa-times" aria-hidden="true" @click="closeModal('comments')" />
        <form @submit.prevent="submitForm">
          <label
            for="comments"
          >
            Veuillez saisir le nouveau commentaire
          </label>
          <textarea
            id="comments"
            v-model.trim="comments.value"
            type="text"
            maxlength="255"
            rows="10"
            cols="26"
          />
          <button>
            Valider
          </button>
        </form>
      </div>
      <div
        v-if="updateDateDebut"
        class="date"
      >
        <i class="fa fa-times" aria-hidden="true" @click="closeModal('dateDebut')" />
        <form @submit.prevent="submitForm">
          <label
            for="dateDebut"
          >
            Veuillez saisir la nouvelle date de début
          </label>
          <input
            id="dateDebut"
            v-model="dateDebut.value"
            type="date"
          >
          <p
            v-if="!dateDebut.isDateNotAlreadyExist && !dateFin.isDateNotAlreadyExist"
            class="invalid"
          >
            Attention, la date saisie entre en conflit avec la date d'une
            réservation déjà existante !<br>
            Veuillez vérifier le tableau de réservation et réessayer.
          </p>
          <p
            v-if="!dateDebut.isValidDiffBetweenDate && !dateFin.isValidDiffBetweenDate"
            class="invalid"
          >
            Attention, la date de début doit être antérieure à la date de fin !
          </p>
          <p v-if="!dateDebut.isValidMaxTime && !dateFin.isValidMaxTime" class="invalid">
            Attention, la durée de réservation ne peut excéder 6 mois !
          </p>
          <button>
            Valider
          </button>
        </form>
      </div>
      <div
        v-if="updateDateFin"
        class="date"
      >
        <i class="fa fa-times" aria-hidden="true" @click="closeModal('dateFin')" />
        <form @submit.prevent="submitForm">
          <label
            for="dateFin"
          >
            Veuillez saisir la nouvelle date de fin
          </label>
          <input
            id="dateFin"
            v-model="dateFin.value"
            type="date"
          >
          <p
            v-if="!dateDebut.isDateNotAlreadyExist && !dateFin.isDateNotAlreadyExist"
            class="invalid"
          >
            Attention, la date saisie entre en conflit avec la date d'une
            réservation déjà existante !<br>
            Veuillez vérifier le tableau de réservation et réessayer.
          </p>
          <p
            v-if="!dateDebut.isValidDiffBetweenDate && !dateFin.isValidDiffBetweenDate"
            class="invalid"
          >
            Attention, la date de début doit être antérieure à la date de fin !
          </p>
          <p v-if="!dateDebut.isValidMaxTime && !dateFin.isValidMaxTime" class="invalid">
            Attention, la durée de réservation ne peut excéder 6 mois !
          </p>
          <button>
            Valider
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-useless-return */
import dayjs from 'dayjs'

export default {
  data () {
    return {
      intitule: {
        value: '',
        isValid: true
      },

      comments: {
        value: '',
        isValid: true
      },

      dateDebut: {
        value: '',
        isValidMaxTime: true,
        isValidDiffBetweenDate: true,
        isDateFilled: true,
        isDateNotAlreadyExist: true
      },

      dateFin: {
        value: '',
        isValidMaxTime: true,
        isValidDiffBetweenDate: true,
        isDateFilled: true,
        isDateNotAlreadyExist: true
      },

      formIsValid: true
    }
  },

  computed: {
    updateIntitule () {
      return this.$store.getters['reservation/updateIntitule']
      // return false
    },

    updateComments () {
      return this.$store.getters['reservation/updateComments']
      // return false
    },

    updateDateDebut () {
      return this.$store.getters['reservation/updateDateDebut']
      // return false
    },

    updateDateFin () {
      return this.$store.getters['reservation/updateDateFin']
      // return false
    },

    updateError () {
      return this.$store.getters['reservation/updateError']
    },

    message () {
      return this.$store.getters['reservation/errorMessage']
    }
  },

  mounted () {
    if (this.$store.getters['reservation/updateIntitule']) {
      this.intitule.value = this.$store.getters['reservation/valueToUpdate']
    } else if (this.$store.getters['reservation/updateComments']) {
      this.comments.value = this.$store.getters['reservation/valueToUpdate']
    } else {
      console.log(this.$store.getters['reservation/valueToUpdate'])
      this.dateDebut.value = this.$store.getters['reservation/valueToUpdate'].dateDebutFormated
      this.dateFin.value = this.$store.getters['reservation/valueToUpdate'].dateFinFormated
    }
  },

  methods: {
    closeModal (modalType) {
      if (modalType === 'intitule') {
        this.$store.commit('reservation/setDisplayModalUpdate', false)
        this.$store.commit('reservation/setUpdateIntitule', false)
      } else if (modalType === 'comments') {
        this.$store.commit('reservation/setDisplayModalUpdate', false)
        this.$store.commit('reservation/setUpdateComments', false)
      } else if (modalType === 'dateDebut') {
        this.$store.commit('reservation/setDisplayModalUpdate', false)
        this.$store.commit('reservation/setUpdateDateDebut', false)
      } else {
        this.$store.commit('reservation/setDisplayModalUpdate', false)
        this.$store.commit('reservation/setUpdateDateFin', false)
      }
    },

    dateVerif () {
      this.dateDebut.isValidDiffBetweenDate = true
      this.dateFin.isValidDiffBetweenDate = true
      this.dateDebut.isValidMaxTime = true
      this.dateFin.isValidMaxTime = true
      this.dateDebut.isDateFilled = true
      this.dateFin.isDateFilled = true
      this.dateDebut.isDateNotAlreadyExist = true
      this.dateFin.isDateNotAlreadyExist = true
      this.formIsValid = true

      if (dayjs(this.dateFin.value).diff(this.dateDebut.value, 'day') < 0) {
        this.dateDebut.isValidDiffBetweenDate = false
        this.dateFin.isValidDiffBetweenDate = false
        this.formIsValid = false
      }
      if (dayjs(this.dateFin.value).diff(this.dateDebut.value, 'month') > 6) {
        this.dateDebut.isValidMaxTime = false
        this.dateFin.isValidMaxTime = false
        this.formIsValid = false
      }
      if (this.dateDebut.value === '' || this.dateFin.value === '') {
        this.dateDebut.isDateFilled = false
        this.dateFin.isDateFilled = false
        this.formIsValid = false
      }

      const selection = this.$store.getters['reservation/currentReservationApplications']
      // On teste les dates de toutes les réservations en cours sauf celle sur laquelle on est en
      // train de faire l'update
      const infosExistingResas = this.$store.getters['reservation/infosResas']
        .filter(item => (
          item.id_reservation !==
          this.$store.getters['reservation/currentReservationApplications'][0].id_reservation
        ))

      for (let i = 0; i < selection.length; i++) {
        for (let j = 0; j < infosExistingResas.length; j++) {
          if (
            selection[i].id_couloir === infosExistingResas[j].id_couloir &&
            selection[i].id_plateforme === infosExistingResas[j].id_plateforme &&
            selection[i].id_application === infosExistingResas[j].id_application
          ) {
            if (
              dayjs(this.dateDebut.value).isBetween(
                dayjs(infosExistingResas[j].date_debut),
                dayjs(infosExistingResas[j].date_fin),
                null,
                '[]'
              ) ||
              dayjs(this.dateFin.value).isBetween(
                dayjs(infosExistingResas[j].date_debut),
                dayjs(infosExistingResas[j].date_fin),
                null,
                '[]'
              ) ||
              dayjs(infosExistingResas[j].date_debut).isBetween(
                dayjs(this.dateDebut.value),
                dayjs(this.dateFin.value),
                null,
                '[]'
              ) ||
              dayjs(infosExistingResas[j].date_fin).isBetween(
                dayjs(this.dateDebut.value),
                dayjs(this.dateFin.value),
                null,
                '[]'
              )
            ) {
              this.dateDebut.isDateNotAlreadyExist = false
              this.dateFin.isDateNotAlreadyExist = false
              this.formIsValid = false
            }
          }
        }
      }
      // console.log(this.formIsValid);
    },

    async submitForm () {
      console.log('it works !')
      if (this.updateDateDebut || this.updateDateFin) {
        this.dateVerif()
      }

      if (this.updateIntitule) {
        this.intitule.isValid = true
        if (this.intitule.value.length === 0) {
          this.intitule.isValid = false
          this.formIsValid = false
        }
      }

      console.log(this.formIsValid, this.intitule.isValid)

      if (!this.formIsValid || !this.intitule.isValid) {
        return
      }

      if (this.$store.getters['reservation/updateIntitule']) {
        const intitule = this.intitule.value
        this.$store.commit('reservation/setNewValueForUpdate', { intitule })
        await this.$store.dispatch('reservation/updateReservation', 'Intitule')
      } else if (this.$store.getters['reservation/updateComments']) {
        const comments = this.comments.value
        this.$store.commit('reservation/setNewValueForUpdate', { comments })
        await this.$store.dispatch('reservation/updateReservation', 'Comments')
      } else if (this.$store.getters['reservation/updateDateDebut']) {
        const dateDebut = this.dateDebut.value
        this.$store.commit('reservation/setNewValueForUpdate', { dateDebut })
        await this.$store.dispatch('reservation/updateReservation', 'DateDebut')
      } else {
        const dateFin = this.dateFin.value
        this.$store.commit('reservation/setNewValueForUpdate', { dateFin })
        await this.$store.dispatch('reservation/updateReservation', 'DateFin')
      }

      console.log('it goes through here !')

      if (!this.$store.getters['reservation/updateError']) {
        let message
        if (this.$store.getters['reservation/updateIntitule']) {
          message = 'L\'intitule de votre réservation a bien été mis à jour'
          this.$store.commit('reservation/setUpdateIntitule', false)
        } else if (this.$store.getters['reservation/updateComments']) {
          message = 'Le commentaire de votre réservation a bien été mis à jour'
          this.$store.commit('reservation/setUpdateComments', false)
        } else if (this.$store.getters['reservation/updateDateDebut']) {
          message = 'La date de début de votre réservation a bien été mise à jour'
          this.$store.commit('reservation/setUpdateDateDebut', false)
        } else {
          message = 'La date de fin de votre réservation a bien été mise à jour'
          this.$store.commit('reservation/setUpdateDateFin', false)
        }

        this.$store.commit('reservation/setConfirmationMessage', message)

        console.log(this.$store.getters['reservation/confirmationMessage'])

        this.$store.commit('reservation/setDisplayModalUpdate', false)
        this.$store.commit('reservation/setDisplayModalResaConfirmation', true)
        setTimeout(() => {
          this.$router.go()
          this.$store.commit('reservation/setDisplayModalResaConfirmation', false)
        }, 2000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.overlay {
  background-color: rgba(128, 128, 128, 0.63);
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.error {
  position: absolute;
  z-index: 20;
  top: 350px;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  // width: 25rem;
  // min-width: 25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  padding: 0.9rem;
  border-radius: 4px;
  background-color: rgb(255, 228, 232);
  border: 1px solid red;
  color: red;

  h3 {
    font-size: 1.1rem;
  }

  .fas.fa-exclamation-circle {
   margin-left: 0.4em;
   color: red;
  }
}

.form-box {
  position: fixed;
  top: 40%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  // width: 22rem;
  min-width: 20rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  padding: 0.8rem 0.8rem 1.3rem 0.8rem;
  border-radius: 3px;
  border: 0.5px solid $bleu-pastel;
  background-color: #fff;

  .fa.fa-times {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: $vert-fonce;
    font-size: 1rem;
  }

  .intitule {
    width: 80%;
    margin: 0 auto;

    form {
      width: 100%;
      text-align: center;
    }
  }

  .comments {
    width: 90%;
    margin: 0 auto;

    form {
      width: 100%;
      text-align: center;

      textarea {
        // width: 16rem;
        // min-height: 5rem;
        // max-height: 10rem;
        margin: 0.6rem 0 0;
        border: 1px solid #ccc;
        color: #333;
        border-radius: 2px;
        padding: 1px 3px;
        font-size: 1rem;
        resize: none;

        &:focus {
          border-color: $vert;
          background-color: rgba(80, 150, 241, 0.12);
          outline: none;
        }
      }
    }
  }

  .date {
    width: 90%;
    margin: 0 auto;

    form {
      width: 100%;
      text-align: center;
    }
  }

  input {
    width: 13rem;
    margin: 0.7rem 0 0;
    border: 1px solid #ccc;
    color: #333;
    border-radius: 2px;
    padding: 1px 3px;
    font-size: 1rem;

    &:focus {
      border-color: $vert;
      background-color: rgba(80, 150, 241, 0.12);
      outline: none;
    }
  }

  label {
    margin-top: 0.8rem;
    display: block;
    font-size: 0.9rem;
    font-weight: bold;
  }

  button {
    border-radius: 2px;
    margin-top: 1rem;
    font-size: 0.8rem;
    border: none;
    color: #fff;
    padding: 0.2rem 0.4rem 0.2rem;
    cursor: pointer;
    background-color: $vert-fonce;
  }

  .invalid {
    margin-top: 0.5rem;
    color: red;
    font-size: 0.8rem;
  }
}
</style>
