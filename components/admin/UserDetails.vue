<template>
  <section class="details-user">
    <nuxt-link 
        to="/admin"
        class="return"
    ><i class="fa fa-arrow-left"></i></nuxt-link>
    <div class="container">
      <div class="above-table-container">
        <h2>{{ userInfos.nom }}</h2>
        <button
          class="button user-delete"
        >
          Supprimer
        </button>
      </div>
      <div>
        <h3>Informations utilisateur</h3>
        <div class="table-container">
          <table class="table-infos account">
            <tbody>
              <tr>
                <td class="data-name">Fonction</td>
                <td>{{ userInfos.fonction }}</td>
              </tr>
              <tr>
                <td class="data-name">Téléphone</td>
                <td>{{ userInfos.telephone }}</td>
              </tr>
              <tr>
                <td class="data-name">email</td>
                <td>{{ userInfos.email }}</td>
              </tr>
              <tr>
                <td class="data-name">rôle</td>
                <td>{{ userInfos.role }}</td>
                <td>
                  <i class="fas fa-pencil-alt" aria-hidden="true" />
                </td>
              </tr>
              <tr>
                <td class="data-name">statut</td>
                <td>
                  <i v-if="userInfos.status" class="fas fa-check-circle"></i>
                  <i v-else class="fas fa-ban"></i>
                </td>
                <td>
                  <i class="fas fa-pencil-alt" aria-hidden="true" />
                </td>
              </tr>
              <tr>
                <td class="data-name">date de création</td>
                <td>{{ userInfos.created_at | date }}</td>
              </tr>
              <tr>
                <td class="data-name">date de mise à jour</td>
                <td v-if="userInfos.updated_at">{{ userInfos.updated_at | date }}</td>
                <td v-else>pas de mise à jour</td>
              </tr>
            </tbody>
          </table>
          <div style="text-align: center;">
          </div>
        </div>
      </div>
      <div class="list-container">
        <h3 class="resa-list-title">Liste des réservations</h3>
        <div v-if="!reservationInfos" class="resa-empty">
          <h3>Aucune réservation</h3>
        </div>
        <div
          v-for="reservation in reservationInfos"
          :key="reservation.idReservation"
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
          <div v-if="reservation.show" class="infos-container">
            <div class="table-container">
              <table class="table-infos">
                <tbody>
                  <tr>
                    <td class="data-name">Intitule</td>
                    <td>{{ reservation.intituleReservation }}</td>
                  </tr>
                  <tr v-if="reservation.commentsReservation" class="row-comments">
                    <td class="data-name">Commentaires</td>
                    <td class="cell-comments">
                      <div class="comments">
                        {{ reservation.commentsReservation }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="data-name">Date de début</td>
                    <td>{{ reservation.dateDebutReservation | date }}</td>
                  </tr>
                  <tr>
                    <td class="data-name">Date de fin</td>
                    <td>{{ reservation.dateFinReservation | date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-container">
              <table class="table-list-app">
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userInfos: null,
      reservationInfos: null
    }
  },

  computed: {
    // reservationInfos() {
    //   // console.log(this.$store.getters['admin/currentUserReservations'])
    //   return this.$store.getters['admin/currentUserReservations'];
    // },

    // userName() {
    //   return this.$store.getters['admin/currentUserInfos'].nom;
    // }
  },

  created() {
    this.$store
      .commit('admin/loadCurrentUserInfos', this.$store.getters['admin/users']
        .find(el => el.id_habilite === +this.$route.params.id));
    this.userInfos = this.$store.getters['admin/currentUserInfos']
    this.reservationInfos = this.$store.getters['admin/currentUserReservations']
  },

  methods: {
    toggleInfosResa(id) {
      this.$store.commit("admin/setCurrentUserReservations", id);
    },
  },

};
</script>

<style scoped lang="scss">
.details-user {
  .return {
    margin: 1rem;
    display: inline-block;
    border-radius: 3px;
    font-size: 1rem;
    background-color: $vert-fonce;
    color: #fff;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  }

  h2 {
    font-size: 1.7rem;
    color: $bleu;
    font-weight: bold;
  }

  h3 {
    text-align: center;
    font-weight: bold;
  }

  .container {
    min-width: 35rem;
    width: 40%;
    margin: 0 auto;
  }

  .above-table-container {
    width: 95%;
    margin: 0 auto 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    margin-top: 4rem;
    width: 100%;
  }

  .resa-list-title {
    margin-bottom: 1rem;
  }

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
    // position: relative;
    // z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    // background-color: $vert;
    color: $vert;
    border: 2px solid $vert;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto 1.2rem;
    padding: 0.4rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  }

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

    &.user-delete {
      background-color: red;
      padding: 0.4rem 0.7rem;
    }
  }

  .infos-container {
    width: 100%;
    color: #333;
  }

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
      width: 100%;
      text-align: center;

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

      &.account {
        margin: 1rem auto;
      }

      tr:not(:first-child, :last-child) {
        border-top: 1px solid $bleu-pastel;
        border-bottom: 1px solid $bleu-pastel;
      }

      td {
        padding: 1rem 0.5rem;
        vertical-align: middle;

        &:first-child {
          width: 11rem;
        }

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

      .fas.fa-check-circle {
        color: green;
      }
      .fas.fa-ban {
        color: red;
      }
    }
  }
}
</style>
