<template>
  <div class="date-box" @submit.prevent="submitForm">
    <form class="form">
      <div class="flex-container">
        <div class="box-control">
          <label for="startDate">Date début</label>
          <input id="startDate" v-model="startDate" type="date" />
        </div>
        <div class="box-control">
          <label for="endDate">Date fin</label>
          <input id="endDate" v-model="endDate" type="date" />
        </div>
      </div>
      <button class="button-validation">Valider</button>
    </form>
  </div>
</template>

<script>
import dayjs from "dayjs";
const dayOfYear = require("dayjs/plugin/dayOfYear");
dayjs.extend(dayOfYear);

export default {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  computed: {},
  created() {
    // console.log(dayjs().format('YYYY-MM-DD'), dayjs().add(2, 'month').format('YYYY-MM-DD'))

    this.startDate = dayjs().format("YYYY-MM-DD");
    this.endDate = dayjs().add(2, "month").format("YYYY-MM-DD");
    this.submitForm();
  },
  methods: {
    submitForm() {
      // console.log(this.startDate, this.endDate);
      const inputDate = {
        start: this.startDate,
        end: this.endDate,
      };
      this.$store.commit("setDateBox", inputDate);
    },
  },
};
</script>

<style scoped lang="scss">
.date-box {
  width: 20rem;
  min-width: 20rem;
  margin: 0.5rem 0 0 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  border-radius: 3px;
  border: 0.5px solid $bleu-pastel;

  .form {
    width: 90%;
    margin: 0 auto;
  }

  .button-validation {
    border-radius: 2px;
    font-size: 0.6rem;
    border: none;
    background-color: $vert-fonce;
    color: #fff;
    padding: 0.2rem 0.6rem;
    cursor: pointer;
  }

  .flex-container {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .box-control {
      input {
        width: 8rem;
        margin: 0.3rem 0;
        border: 1px solid #333;
        color: #797979;
        border-radius: 2px;
        padding: 1px 3px;
        font-size: 0.7rem;

        &:focus {
          outline: none;
        }
      }

      label {
        display: block;
        font-size: 0.7rem;
      }
    }
  }
}
</style>
