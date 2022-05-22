<template>
  <section class="overlay">
    <div
      v-if="deleteError"
      class="error"
    >
      <h3>{{ message }}<i class="fas fa-exclamation-circle" aria-hidden="true" /></h3>
    </div>
    <div
      v-if="!deleteError"
      class="confirm-delete"
    >
      <h3>
        Êtes-vous sûr de vouloir supprimer
        <span v-if="deleteApp"> de la réservation l'application</span>
        <span v-else>la réservation</span><br>
        <span class="deleteName">{{ name }}</span>
      </h3>
      <button
        class="button validation"
        @click="deleteItem()"
      >
        Confirmer
      </button>
      <button class="button annulation" @click="closeModal">
        Annuler
      </button>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */
export default {
  data () {
    return {
      deleteApp: false
    }
  },

  computed: {
    name () {
      return this.$store.getters['reservation/deleteName']
    },

    deleteError () {
      return this.$store.getters['reservation/deleteError']
    },

    message () {
      return this.$store.getters['reservation/errorMessage']
    }
  },

  mounted () {
    if (this.$store.getters['reservation/deletionType'] === 'app') {
      this.deleteApp = true
    }
  },

  methods: {
    closeModal () {
      this.$store.commit('reservation/setDisplayModalDelete', false)
    },

    async deleteItem () {
      if (this.$store.getters['reservation/deletionType'] === 'app') {
        await this.$store.dispatch('reservation/deleteOneReservedApplication')
      } else {
        await this.$store.dispatch('reservation/deleteEntireReservation')
      }

      if (!this.$store.getters['reservation/deleteError']) {
        console.log(this.$store.getters['reservation/deleteError'])

        this.$store.commit('reservation/setConfirmationMessage', 'La suppression a bien été effectuée')

        this.$store.commit('reservation/setDisplayModalDelete', false)
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

.confirm-delete {
  position: absolute;
  z-index: 20;
  top: 350px;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  // width: 25rem;
  min-width: 25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  padding: 0.8rem;
  border-radius: 4px;
  border: 0.5px solid $bleu-pastel;
  background-color: #fff;
  // text-align: center;

  h3 {
    font-size: 1rem;
    text-align: center;
  }

  .fa.fa-times {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: $vert-fonce;
    font-size: 1rem;
  }

  .deleteName {
    display: block;
    font-size: 1.2rem;
    color: $vert;
    margin-top: 0.6rem;
  }

  .button {
    border-radius: 2px;
    margin-top: 1rem;
    font-size: 0.8rem;
    border: none;
    color: #fff;
    padding: 0.2rem 0.4rem 0.2rem;
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
}
</style>
