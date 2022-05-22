<template>
  <div>
    <h2>Mes réservations</h2>
    <section class="container">
      <div
        v-if="!reservationsList"
        class="resa-empty"
      >
        <h3>Aucune réservation</h3>
      </div>
      <div
        v-else
        class="list-container"
      >
        <div
          v-for="reservation in reservationsList"
          :key="`${reservation.idReservation}`"
          class="reservation"
        >
          <div class="list-sub-container">
            <h3>{{ reservation.intituleReservation }}</h3>
            <button
              v-if="!reservation.show"
              class="button resa-open"
              @click="toggleInfosResa(reservation.idReservation)"
            >
              Ouvrir
            </button>
            <button
              v-else
              class="button resa-open"
              @click="toggleInfosResa(reservation.idReservation)"
            >
              Fermer
            </button>
          </div>
          <div
            v-if="reservation.show"
            class="infos-container"
          >
            <div class="table-container">
              <table
                class="table-infos"
              >
                <tbody>
                  <tr>
                    <td
                      class="data-name"
                    >
                      Intitule
                    </td>
                    <td>{{ reservation.intituleReservation }}</td>
                    <td
                      @click="update('intitule', reservation.intituleReservation, reservation.idReservation)"
                    >
                      <i class="fas fa-pencil-alt" aria-hidden="true" />
                    </td>
                  </tr>
                  <tr
                    class="row-comments"
                  >
                    <td
                      class="data-name"
                    >
                      Commentaires
                    </td>
                    <td
                      class="cell-comments"
                    >
                      <div class="comments">
                        {{ reservation.commentsReservation }}
                      </div>
                    </td>
                    <td
                      @click="update('comments', reservation.commentsReservation, reservation.idReservation)"
                    >
                      <i class="fas fa-pencil-alt" aria-hidden="true" />
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="data-name"
                    >
                      Date de début
                    </td>
                    <td>{{ reservation.dateDebutReservation }}</td>
                    <td
                      @click="updateDate('dateDebut', reservation.dateDebutReservation, reservation.dateFinReservation, reservation.allReservedApplications, reservation.idReservation)"
                    >
                      <i class="fas fa-pencil-alt" aria-hidden="true" />
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="data-name"
                    >
                      Date de fin
                    </td>
                    <td>{{ reservation.dateFinReservation }}</td>
                    <td
                      @click="updateDate('dateFin', reservation.dateDebutReservation, reservation.dateFinReservation, reservation.allReservedApplications, reservation.idReservation)"
                    >
                      <i class="fas fa-pencil-alt" aria-hidden="true" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-container">
              <table
                class="table-list-app"
              >
                <thead>
                  <tr>
                    <th>Couloir</th>
                    <th>Plateforme</th>
                    <th>Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="application in reservation.allReservedApplications"
                    :key="application.id_application"
                  >
                    <td>{{ application.nom_couloir }}</td>
                    <td>{{ application.nom_plateforme }}</td>
                    <td>{{ application.nom_application }}</td>
                    <td
                      @click="deleteOne(application.nom_application, reservation.idReservation, application.id_couloir, application.id_plateforme, application.id_application)"
                    >
                      <i class="fas fa-trash-alt" aria-hidden="true" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              class="button resa-delete"
              @click="deleteAll(reservation.intituleReservation, reservation.idReservation)"
            >
              Supprimer
            </button>
          </div>
          <!-- <p
              v-for="application in reservation.allReservedApplications"
              :key="application.id_application"
            >
              <span>{{ application.nom_couloir }}</span> |
              <span>{{ application.nom_plateforme }}</span> |
              <span>{{ application.nom_application }}</span>
            </p> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-lonely-if */
/* eslint-disable no-console */

export default {
  computed: {
    reservationsList () {
      return this.$store.getters['auth/userReservations']
    }
  },

  mounted () {
    // this.$router.go()
  },

  methods: {
    toggleInfosResa (id) {
      console.log('It goes trought there')
      // const testArray = [...]
      // const newReservationsList = this.$store.getters['auth/userReservations'].filter((item) => {
      //   if (item.idReservation === id) {
      //     item.show = !item.show
      //   }
      //   return true
      // })

      // this.reservationsList = newReservationsList
      this.$store.commit('auth/setUserReservations', id)
    },

    update (updateType, currentValue, idReservation) {
      this.$store.commit('reservation/setCurrentReservationId', idReservation)
      console.log(updateType)
      if (updateType === 'intitule') {
        this.$store.commit('reservation/setValueToUpdate', currentValue)
        this.$store.commit('reservation/setDisplayModalUpdate', true)
        this.$store.commit('reservation/setUpdateIntitule', true)
      } else if (updateType === 'comments') {
        this.$store.commit('reservation/setValueToUpdate', currentValue)
        this.$store.commit('reservation/setDisplayModalUpdate', true)
        this.$store.commit('reservation/setUpdateComments', true)
      }
    },

    updateDate (updateType, dateDebut, dateFin, allReservedApplications, idReservation) {
      this.$store.commit('reservation/setCurrentReservationId', idReservation)
      const tp1 = dateDebut.split('/')
      const tp2 = dateFin.split('/')
      const dateDebutFormated = `${tp1[2]}-${tp1[1]}-${tp1[0]}`
      const dateFinFormated = `${tp2[2]}-${tp2[1]}-${tp2[0]}`

      this.$store.commit('reservation/setCurrentReservationApplications', allReservedApplications)
      console.log(allReservedApplications)

      if (updateType === 'dateDebut') {
        this.$store.commit('reservation/setValueToUpdate', { dateDebutFormated, dateFinFormated })
        this.$store.commit('reservation/setDisplayModalUpdate', true)
        this.$store.commit('reservation/setUpdateDateDebut', true)
      } else {
        this.$store.commit('reservation/setValueToUpdate', { dateDebutFormated, dateFinFormated })
        this.$store.commit('reservation/setDisplayModalUpdate', true)
        this.$store.commit('reservation/setUpdateDateFin', true)
      }
    },

    deleteOne (applicationName, idResa, idCouloir, idPlateforme, idApplication) {
      this.$store.commit('reservation/setDeleteInfos', { idResa, idCouloir, idPlateforme, idApplication })
      this.$store.commit('reservation/setDeleteName', applicationName)
      this.$store.commit('reservation/setDeletionType', 'app')
      this.$store.commit('reservation/setDisplayModalDelete', true)
    },

    deleteAll (reservationIntitule, idResa) {
      this.$store.commit('reservation/setDeleteInfos', idResa)
      this.$store.commit('reservation/setDeleteName', reservationIntitule)
      this.$store.commit('reservation/setDeletionType', 'resa')
      this.$store.commit('reservation/setDisplayModalDelete', true)
    }
  }
}
</script>

<style scoped lang="scss">

h2 {
  font-size: 1.7rem;
  margin-top: 2rem;
  text-align: center;
}

.container {
  min-width: 35rem;
  width: 40%;
  margin: 3rem auto 0;
}

.resa-empty {
  width: 15rem;
  margin: 2rem auto;
  color: $vert;
  border: 2px solid $vert;
  border-radius: 5px;
  text-align: center;
  padding: 1rem;
}

.list-container {
  width: 100%;

  .list-sub-container {
    width: 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-left: 4rem;

    h3 {
      // margin-right: 2rem;
      font-size: 1.2rem;
      font-weight: bold;
    }

    p {
      margin-top: 0.1rem;
      font-size: 1rem;
    }
  }

  .reservation {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    // background-color: $vert;
    color: $vert;
    border: 2px solid $vert;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 1.2rem;
    padding: 0.4rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);

    .button {
      font-weight: bold;
      border-radius: 4px;
      color: white;
      padding: 0.2rem 0.7rem;
      // margin-bottom: 0.2rem;
      border: none;
      cursor: pointer;

      &.resa-open {
        background-color: $vert;
      }

      &.resa-delete {
        margin: 0.8rem 0;
        background-color: red;
        padding: 0.4rem 0.7rem;
      }
    }
  }

  .infos-container {
    width: 100%;
    color: #333;

    p {
      text-align: left;
      margin: 1rem 0 1rem 1rem;

      span {
        margin-left: 3rem;
        font-weight: bold;
        font-size: 1rem;
      }

      .result {
        font-weight: normal;
      }
    }

    .table-container {
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      width: 95%;
      margin: 0 auto;

      .table-list-app {
      // border-collapse: collapse;
        margin: 0.6rem auto;
        width: 90%;
        text-align: left;

        tr {
          border-top: 1px solid $bleu-pastel;
          border-bottom: 1px solid $bleu-pastel;

          &:first-child {
            border-top: none;
          }

          &:last-child {
            border-bottom: none;
          }
        }

        td {
          padding: 1rem 0.5rem;
          border-top: 1px solid $bleu-pastel;
        }

        th {
          // border: 1px solid $vert;
          font-weight: bold;
          padding: 1rem 0.5rem;
        }

        .fas.fa-trash-alt {
          color: red;
          cursor: pointer;
          font-size: 1.2rem;
        }
      }

      .table-infos {
        margin: 2rem auto;
        width: 90%;
        text-align: left;

        tr:not(:first-child, :last-child) {
          border-top: 1px solid $bleu-pastel;
          border-bottom: 1px solid $bleu-pastel;
        }

        td {
          padding: 1rem 0.5rem;
          vertical-align: middle;

          .comments {
            border: 1px solid rgb(224, 224, 224);
            border-radius: 3px;
            background-color: rgb(251, 251, 251);
            max-width: 16rem;
            min-height: 2rem;
            max-height: 10rem;
            overflow-y: auto;
            padding: 0.5rem;
            text-align: justify;
          }

          &.cell-comments {
            padding: 0.5rem;
          }
        }

        .data-name {
          font-weight: bold;
          width: 30%;
        }

        .fas.fa-pencil-alt {
          color: $orange;
          cursor: pointer;
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
