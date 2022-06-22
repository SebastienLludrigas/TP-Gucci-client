<template>
  <section
    class="overlay"
  >
    <div
      v-if="createError"
      class="error"
    >
      <h3>{{ message }}<i class="fas fa-exclamation-circle" aria-hidden="true" /></h3>
    </div>
    <div
      v-if="!createError"
      class="info-box"
    >
      <h3>Vous souhaitez faire une demande de réservation avec les données suivantes :</h3>
      <div class="info-resa">
        <p class="item-info">
          intitule de reservation : <span class="name">{{ resaInfo.intitule }}</span>
        </p>
        <p class="item-info">
          couloir : <span class="couloir">{{ resaInfo.selection[0].nom_couloir.split('-')[1] }}</span>
        </p>
        <p class="item-info">
          plateforme :
          <ul>
            <li
              v-for="item in resaPfInfo"
              :key="`${item}`"
              class="plateforme"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </p>
        <p class="item-info">
          application(s) :
          <ul>
            <li
              v-for="item in resaAppInfo"
              :key="`${item}`"
              class="application"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </p>
        <p class="item-info">
          date debut : <span class="date">{{ resaInfo.start }}</span>
        </p>
        <p class="item-info">
          date fin : <span class="date">{{ resaInfo.end }}</span>
        </p>
      </div>
      <button class="button validation" @click="creationReservation">
        Confirmer
      </button>
      <button class="button annulation" @click="closeModal">
        Annuler
      </button>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    resaInfo () {
      return this.$store.getters['reservation/reservationInfo']
    },
    resaAppInfo () {
      const filterApp = []
      this.$store.getters['reservation/reservationInfo'].selection.forEach(
        (item, index) => {
          if (index === 0) {
            filterApp.push(item.nom_application)
          } else if (!filterApp.includes(item.nom_application)) {
            filterApp.push(item.nom_application)
          }
        }
      )
      // console.log(filterApp);
      return filterApp
    },
    resaPfInfo () {
      const filterPf = []
      this.$store.getters['reservation/reservationInfo'].selection.forEach(
        (item, index) => {
          if (index === 0) {
            filterPf.push(item.nom_plateforme)
          } else if (!filterPf.includes(item.nom_plateforme)) {
            filterPf.push(item.nom_plateforme)
          }
        }
      )
      // console.log(filterApp);
      return filterPf
    },
    message () {
      return this.$store.getters['reservation/errorMessage']
    },
    createError () {
      return this.$store.getters['reservation/createError']
    }
  },
  methods: {
    // async loadInfosResas () {
    //   try {
    //     await this.$store.dispatch('reservation/loadInfosResas')
    //   } catch (error) {
    //     return error
    //   }
    // },
    closeModal () {
      this.$store.commit('reservation/setDisplayModalResaSummary', false)
    },
    async creationReservation () {
      await this.$store.dispatch('reservation/creationReservation')

      if (!this.$store.getters['reservation/createError']) {
        this.$store.commit('reservation/setDisplayModalResaSummary', false)
        this.$store.commit('reservation/setConfirmationMessage', 'Votre réservation a bien été enregistrée')
        this.$store.commit('reservation/setDisplayModalResaConfirmation', true)
        setTimeout(() => {
          this.$router.go()
        }, 3000)
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

  .info-box {
    position: fixed;
    top: 25%;
    transform: translateY(-50%);
    left: 50%;
    transform: translateX(-50%);
    width: 27rem;
    min-width: 25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
    padding: 0.8rem;
    border-radius: 3px;
    border: 0.5px solid $bleu-pastel;
    background-color: #fff;

    h3 {
      margin-left: 1rem;
    }

    .info-resa {
      min-height: 12rem;
      max-height: 19rem;
      overflow-y: auto;
      margin: 1.5rem 0 0.5rem 2.5rem;
    }

    .button {
      border-radius: 2px;
      margin-top: 1rem;
      font-size: 1rem;
      border: none;
      color: #fff;
      padding: 0.3rem 0.6rem 0.2rem;
      cursor: pointer;

      &.validation {
        background-color: $vert-fonce;
        margin-left: 2.5rem;
      }

      &.annulation {
        background-color: red;
        float: right;
        margin-right: 2.5rem;
      }
    }

    .item-info {
      text-transform: uppercase;
      font-size: 0.9rem;
      font-weight: bold;
      margin-bottom: 0.8rem;

      & .name {
        text-transform: none;
        font-weight: normal;
        font-size: 0.9rem;
        color: $vert;
      }

      & .couloir {
        font-weight: normal;
        font-size: 0.9rem;
        color: $vert;
      }

      & ul {
        font-weight: normal;
        margin-top: 0.3rem;
        list-style-type: disc;
        margin-left: 2rem;

        & li {
          margin-bottom: 0.2rem;
        }
      }

      & ul .plateforme {
        font-size: 0.9rem;
        text-transform: uppercase;

        & span {
          color: $vert;
        }
      }

      & ul .application {
        font-size: 0.9rem;
        text-transform: lowercase;

        & span {
          color: $vert;
        }
      }

      & .date {
        font-weight: normal;
        font-size: 0.9rem;
        color: $vert;
      }
    }
  }
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
</style>
