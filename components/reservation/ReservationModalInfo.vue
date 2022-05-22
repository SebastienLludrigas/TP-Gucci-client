<template>
  <section class="overlay">
    <div class="info-box">
      <h3>{{ infosResaModal.intitule }}</h3>
      <i class="fa fa-times" aria-hidden="true" @click="closeModal" />
      <div class="info-resa">
        <p class="item-info">
          Nom : <span class="name">{{ infosResaModal.name }}</span>
        </p>
        <p class="item-info">
          Fonction : <span class="name">{{ infosResaModal.fonction }}</span>
        </p>
        <p class="item-info">
          Email: <span class="name">{{ infosResaModal.email }}</span>
        </p>
        <p class="item-info">
          Telephone : <span class="name">{{ infosResaModal.telephone }}</span>
        </p>
        <p class="item-info">
          couloir : <span class="couloir">{{ infosResaModal.nomCouloir }}</span>
        </p>
        <p class="item-info">
          plateforme :
          <span class="couloir">{{ infosResaModal.nomPlateforme }}</span>
        </p>
        <p class="item-info">
          application :
          <span class="couloir">{{ infosResaModal.nomApplication }}</span>
        </p>
        <p class="item-info">
          date debut : <span class="date">{{ dateDebut }}</span>
        </p>
        <p class="item-info">
          date fin : <span class="date">{{ dateFin }}</span>
        </p>
        <p v-if="infosResaModal.comments !== null" class="item-info">
          Commentaire : <br><span class="comments">{{ infosResaModal.comments }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable vue/require-prop-types */
/* eslint-disable no-console */
import dayjs from 'dayjs'

export default {
  computed: {
    dateDebut () {
      return dayjs(this.$store.getters['reservation/infosResaModal'].date_debut).format('DD/MM/YYYY')
    },
    dateFin () {
      return dayjs(this.$store.getters['reservation/infosResaModal'].date_fin).format('DD/MM/YYYY')
    },
    infosResaModal () {
      // console.log(this.$store.getters['reservation/infosResaModal'])
      return this.$store.getters['reservation/infosResaModal']
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('reservation/setDisplayModalResaInfo', false)
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

.info-box {
  position: absolute;
  z-index: 20;
  top: 150px;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  max-width: 30rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  padding: 0.8rem;
  border-radius: 3px;
  border: 0.5px solid $bleu-pastel;
  background-color: #fff;

  h3 {
    margin: 0 1.5rem;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
  }

  .fa.fa-times {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: $vert-fonce;
    font-size: 1.1rem;
  }

  .info-resa {
    // margin-left: 2rem;
    max-height: 20rem;
    // width: 20rem;
    overflow-y: auto;
    padding: 1.5rem 2.5rem 0.8rem 3rem;
    text-align: left;
  }

  .button-container {
    display: flex;
    justify-content: space-around;
  }

  .button {
    border-radius: 2px;
    font-size: 1rem;
    border: none;
    color: #fff;
    padding: 0.3rem 0.6rem 0.2rem;
    cursor: pointer;

    &.update {
      background-color: $vert;
    }

    &.delete {
      background-color: red;
    }
  }

  .item-info {
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 0.8rem;

    &:last-child {
      margin-bottom: 0;
    }

    & .comments {
      display: block;
      margin-top: 0.4rem;
      text-transform: none;
      max-width: 20rem;
      font-weight: normal;
      font-size: 0.9rem;
      color: $vert;
    }

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
</style>
