<template>
  <section>
    <client-only>
      <List />
      <ReservationUpdate v-if="displayModalUpdate" />
      <ReservationDelete v-if="displayModalDelete" />
      <ReservationConfirmation v-if="displayModalResaConfirmation" />
    </client-only>
  </section>
</template>

<script>
/* eslint-disable no-console */
import List from '../components/main/List'
import ReservationUpdate from '~/components/reservation/ReservationUpdate'
import ReservationDelete from '~/components/reservation/ReservationDelete'
import ReservationConfirmation from '~/components/reservation/ReservationConfirmation'

export default {
  components: {
    List,
    ReservationUpdate,
    ReservationDelete,
    ReservationConfirmation
  },
  middleware: 'check-auth',

  computed: {
    displayModalUpdate () {
      return this.$store.getters['reservation/displayModalUpdate']
    },
    displayModalDelete () {
      return this.$store.getters['reservation/displayModalDelete']
      // return true
    },
    displayModalResaConfirmation () {
      return this.$store.getters['reservation/displayModalResaConfirmation']
    }
  }
}
</script>

<style>

</style>
