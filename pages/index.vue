<template>
  <div class="main-container">
    <client-only>
      <ReservationForm v-if="displayModalForm" />
      <ReservationSummary v-if="displayModalResaSummary" />
      <ReservationConfirmation v-if="displayModalResaConfirmation" />
      <ReservationModalInfo v-if="displayModalResaInfo" />
    </client-only>
    <div class="left-container">
      <SelectionBox />
    </div>
    <div class="central-container">
      <DateBox />
      <DynamicArray />
    </div>
  </div>
</template>

<script>
import DateBox from "~/components/main/DateBox";
import SelectionBox from "~/components/main/SelectionBox";
// import DynamicArrayCopy from '~/components/main/DynamicArrayCopy'
import DynamicArray from "~/components/main/DynamicArray";
import ReservationForm from "~/components/reservation/ReservationForm";
import ReservationSummary from "~/components/reservation/ReservationSummary";
import ReservationConfirmation from "~/components/reservation/ReservationConfirmation";
import ReservationModalInfo from "~/components/reservation/ReservationModalInfo";

export default {
  components: {
    DateBox,
    SelectionBox,
    DynamicArray,
    ReservationForm,
    ReservationSummary,
    ReservationConfirmation,
    ReservationModalInfo,
  },

  middleware: 'check-auth',

  computed: {
    displayModalForm() {
      return this.$store.getters["reservation/displayModalForm"];
    },
    displayModalFormUpdate() {
      return this.$store.getters["reservation/displayModalFormUpdate"];
    },
    displayModalResaSummary() {
      return this.$store.getters["reservation/displayModalResaSummary"];
    },
    displayModalResaConfirmation() {
      return this.$store.getters["reservation/displayModalResaConfirmation"];
    },
    displayModalResaInfo() {
      return this.$store.getters["reservation/displayModalResaInfo"];
    },
  },
};
</script>

<style lang="scss">
.main-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  .left-container {
    margin: 0.5rem 0 0 1.5%;
    min-width: 22rem;
  }

  .central-container {
    min-width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
