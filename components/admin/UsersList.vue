<template>
  <section class="container">
    <div class="above-table-container">
      <h2>Liste des utilisateurs</h2>
      <nuxt-link 
        to="/admin/new"
        class="new"
      >Nouveau</nuxt-link>
    </div>
    <div class="table-container">
      <table class="table-list-users">
        <thead>
          <tr>
            <!-- <th>id</th> -->
            <th>Nom</th>
            <th>Fonction</th>
            <!-- <th>email</th> -->
            <!-- <th>Telephone</th> -->
            <!-- <th>Réservations</th> -->
            <!-- <th>Role</th> -->
            <th class="status">Statut</th>
            <th class="action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id_habilite"
          >
            <!-- <td>{{ user.id_habilite }}</td> -->
            <td>{{ user.nom }}</td>
            <td>{{ user.fonction }}</td>
            <!-- <td>{{ user.email }}</td> -->
            <!-- <td>{{ user.telephone }}</td> -->
            <!-- <td>
              <nuxt-link :to="`/admin/user-reservation/${user.id_habilite}`">Voir réservations</nuxt-link>
            </td> -->
            <!-- <td>{{ user.role }}</td> -->
            <td>
              <i v-if="user.status" class="fas fa-check-circle"></i>
              <i v-else class="fas fa-ban"></i>
            </td>
            <td>
              <nuxt-link 
                :to="`/admin/details/${user.id_habilite}`"
                class="details"
              >Voir</nuxt-link>
            </td>
            <!-- <td v-if="user.status"><button>Désactiver</button></td> -->
            <!-- <td v-else><button>Activer</button></td> -->
            <!-- <td><i class="fas fa-trash-alt" aria-hidden="true" /></td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    users () {
      // console.log(this.$store.getters['admin/users'])
      return this.$store.getters['admin/users']
    }
  },

  mounted() {
    // this.$store.commit('admin/loadReservations', ['une résa'])
    // console.log(this.$store.getters['admin/users'])
    // console.log(this.$store.getters['admin/reservations'])
  },

  // methods: {
  //   loadUserResas(id) {
  //     this.$store
  //       .commit('admin/loadCurrentUserInfos', this.$store.getters['admin/users']
  //         .find(el => el.id_habilite === id));
  //   }
  // }
}
</script>

<style lang="scss" scoped>

.container {
  // min-width: fit-content;
  width: 50%;
  margin: 3rem auto 0;

  h2 {
    font-size: 1.7rem;
    text-align: center;
    color: $bleu;
    font-weight: bold;
  }

  .new {
    border-radius: 3px;
    font-size: 1rem;
    background-color: $vert-fonce;
    color: #fff;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  }

  .above-table-container {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .table-container {
    border-radius: 3px;
    height: 70vh;
    overflow: auto;
    border: 1px solid $bleu;
    
    .table-list-users {
      border-collapse: separate;
      border-spacing: 0;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.18);
      min-width: 40rem;
      width: 100%;
  
      thead {
        tr {  
          position: sticky;
          top: 0;
          z-index: 1;

          th {
            font-weight: bold;
            background-color: #9bd3ae;
            border-bottom: 1px solid $bleu;
            padding: 0.6rem;
            text-align: left;
            vertical-align: middle;
            
            &.status,
            &.action {
              width: 0;
            }
          }
        }
      }
  
      tbody {
        tr {
          cursor: pointer;
          transition-duration: 0.2s;

          &:hover {
            background-color: rgba(80, 150, 241, 0.12);
          }

          .fas.fa-check-circle {
            color: green;
          }
          .fas.fa-ban {
            color: red;
          }
          .fas.fa-eye {
            color: green;
            cursor: pointer;
            font-size: 1.2rem;
          }
          .fas.fa-trash-alt {
            color: red;
            cursor: pointer;
            font-size: 1rem;
          }

          td {
            color: rgb(70, 70, 70);
            padding: 0.6rem;
            vertical-align: middle;
            border-bottom: 1px solid $bleu;

            .details {
              margin: 0 auto;
              border-radius: 2px;
              font-size: 0.7rem;
              background-color: $vert-fonce;
              color: #fff;
              padding: 0.2rem 0.7rem;
              cursor: pointer;
            }
          }

          &:last-child td {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>