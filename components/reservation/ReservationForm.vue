<template>
  <section class="overlay">
    <div class="form-box">
      <form class="form" @submit.prevent="submitForm">
        <p class="title">Veuillez saisir les informations suivantes :</p>
        <div class="box-control-intitule">
          <label for="start">Intitulé</label>
          <input
            id="intitule"
            v-model.trim="intitule.value"
            type="text"
            maxlength="20"
            :class="intitule.isValid ? '' : 'invalidInput'"
            @blur="invalidButton"
          />
          <p v-if="!intitule.isValid" class="invalid">
            Attention, le champ intitulé doit être rempli !
          </p>
        </div>
        <div class="box-control-comments">
          <label for="start">Commentaire</label>
          <textarea
            id="comments"
            v-model.trim="comments.value"
            type="text"
            maxlength="255"
            rows="10"
            cols="28"
          />
        </div>
        <div class="flex-container">
          <div class="box-control-date">
            <label for="start">Date début</label>
            <input
              id="start"
              v-model="start.value"
              type="date"
              :class="invalidDate"
              @blur="invalidButton"
            />
          </div>
          <div class="box-control-date">
            <label for="end">Date fin</label>
            <input
              id="end"
              v-model="end.value"
              type="date"
              :class="invalidDate"
              @blur="invalidButton"
            />
          </div>
        </div>
        <p
          v-if="!start.isDateNotAlreadyExist && !end.isDateNotAlreadyExist"
          class="invalid"
        >
          Attention, la date saisie entre en conflit avec la date d'une
          réservation déjà existante !<br />
          Veuillez vérifier le tableau de réservation et réessayer.
        </p>
        <p
          v-if="!start.isValidDiffBetweenDate && !end.isValidDiffBetweenDate"
          class="invalid"
        >
          Attention, la date de début doit être antérieure à la date de fin !
        </p>
        <p v-if="!start.isDateFilled && !end.isDateFilled" class="invalid">
          Attention, les champs date doivent être remplis !
        </p>
        <p v-if="!start.isValidMaxTime && !end.isValidMaxTime" class="invalid">
          Attention, la durée de réservation ne peut excéder 6 mois !
        </p>
        <button :class="{ button: true, invalid: invalid, validation: true }">
          Valider
        </button>
        <button class="button annulation" type="button" @click="closeModal">
          Annuler
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      intitule: {
        value: "",
        isValid: true,
      },
      comments: {
        value: "",
        isValid: true,
      },
      start: {
        value: "",
        isValidMaxTime: true,
        isValidDiffBetweenDate: true,
        isDateFilled: true,
        isDateNotAlreadyExist: true,
      },
      end: {
        value: "",
        isValidMaxTime: true,
        isValidDiffBetweenDate: true,
        isDateFilled: true,
        isDateNotAlreadyExist: true,
      },
      formIsValid: true,
      invalid: true,
    };
  },
  computed: {
    invalidDate() {
      return {
        inputInvalid:
          !this.start.isValidMaxTime ||
          !this.start.isValidDiffBetweenDate ||
          !this.start.isDateFilled ||
          !this.end.isValidMaxTime ||
          !this.end.isValidDiffBetweenDate ||
          !this.end.isDateFilled,
      };
    },
  },

  methods: {
    invalidButton() {
      this.intituleVerif();
      if (this.start.value !== "" && this.end.value !== "") {
        this.dateVerif();
      }
    },

    intituleVerif() {
      this.intitule.isValid = true;

      if (this.intitule.value.length === 0) {
        this.intitule.isValid = false;
        this.formIsValid = false;
        this.invalid = true;
      }
    },

    dateVerif(isSubmitForm = false) {
      this.start.isValidDiffBetweenDate = true;
      this.end.isValidDiffBetweenDate = true;
      this.start.isValidMaxTime = true;
      this.end.isValidMaxTime = true;
      this.start.isDateFilled = true;
      this.end.isDateFilled = true;
      this.start.isDateNotAlreadyExist = true;
      this.end.isDateNotAlreadyExist = true;
      this.formIsValid = true;
      this.intitule.isValid ? (this.invalid = false) : (this.invalid = true);

      if (dayjs(this.end.value).diff(this.start.value, "day") < 0) {
        this.start.isValidDiffBetweenDate = false;
        this.end.isValidDiffBetweenDate = false;
        this.formIsValid = false;
        this.invalid = true;
      }
      if (dayjs(this.end.value).diff(this.start.value, "month") > 6) {
        this.start.isValidMaxTime = false;
        this.end.isValidMaxTime = false;
        this.formIsValid = false;
        this.invalid = true;
      }
      if (isSubmitForm) {
        if (this.start.value === "" || this.end.value === "") {
          this.start.isDateFilled = false;
          this.end.isDateFilled = false;
          this.formIsValid = false;
          this.invalid = true;
        }
      }

      const selection = this.$store.getters.selectionApp;
      const infosExistingResas = this.$store.getters["reservation/infosResas"];

      if (this.start.value !== "" && this.end.value !== "") {
        for (let i = 0; i < selection.length; i++) {
          for (let j = 0; j < infosExistingResas.length; j++) {
            if (
              selection[i].id_couloir === infosExistingResas[j].id_couloir &&
              selection[i].id_plateforme ===
                infosExistingResas[j].id_plateforme &&
              selection[i].id === infosExistingResas[j].id_application
            ) {
              if (
                dayjs(this.start.value).isBetween(
                  dayjs(infosExistingResas[j].date_debut),
                  dayjs(infosExistingResas[j].date_fin),
                  null,
                  "[]"
                ) ||
                dayjs(this.end.value).isBetween(
                  dayjs(infosExistingResas[j].date_debut),
                  dayjs(infosExistingResas[j].date_fin),
                  null,
                  "[]"
                ) ||
                dayjs(infosExistingResas[j].date_debut).isBetween(
                  dayjs(this.start.value),
                  dayjs(this.end.value),
                  null,
                  "[]"
                ) ||
                dayjs(infosExistingResas[j].date_fin).isBetween(
                  dayjs(this.start.value),
                  dayjs(this.end.value),
                  null,
                  "[]"
                )
              ) {
                this.start.isDateNotAlreadyExist = false;
                this.end.isDateNotAlreadyExist = false;
                this.formIsValid = false;
                this.invalid = true;
              }
            }
          }
        }
      }
    },

    submitForm() {
      console.log("step0");
      this.intituleVerif();
      console.log("step1");
      this.dateVerif(true);

      console.log("step2");

      if (!this.formIsValid || !this.intitule.isValid) {
        this.invalid = true;
        return;
      }

      console.log("step3");

      const data = {
        intitule: this.intitule.value,
        comments: this.comments.value,
        start: dayjs(this.start.value).format("DD/MM/YYYY"),
        end: dayjs(this.end.value).format("DD/MM/YYYY"),
      };

      this.$store.dispatch("reservation/setInfoResa", data);
      this.$store.commit("reservation/setDisplayModalForm", false);
      this.$store.commit("reservation/setDisplayModalResaSummary", true);
      // console.log(this.$store.getters['reservation/reservationInfo']);

      // this.closeModal()
      // this.$store.commit('reservation/setDisplayModalResaSummary', true)
      console.log(
        this.$store.getters["reservation/reservationInfo"],
        "line 368"
      );
    },
    closeModal() {
      this.$store.commit("reservation/setDisplayModalForm", false);
    },
  },
};
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

  .form-box {
    position: fixed;
    top: 20%;
    transform: translateY(-50%);
    left: 50%;
    transform: translateX(-50%);
    width: 22rem;
    min-width: 22rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
    padding: 0.8rem;
    border-radius: 3px;
    border: 0.5px solid $bleu-pastel;
    background-color: #fff;

    .form {
      width: 92%;
      margin: 0 auto;

      .title {
        font-size: 1.2rem;
        margin-bottom: 1.2rem;
      }
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
      }

      &.invalid {
        background-color: rgb(211, 211, 211);
      }

      &.annulation {
        background-color: red;
        float: right;
      }
    }

    .flex-container {
      display: flex;
      width: 100%;
      margin-top: 1rem;
      justify-content: space-between;

      .box-control-date {
        .inputInvalid {
          border: 1px solid #ff0000;
        }

        input {
          width: 9rem;
          margin: 0.3rem 0;
          border: 1px solid #333;
          color: #333;
          border-radius: 2px;
          padding: 1px 3px;
          // font-size: 1rem;

          &:focus {
            border-color: $vert;
            background-color: rgba(80, 150, 241, 0.12);
            outline: none;
          }
        }

        label {
          display: block;
          font-size: 0.9rem;
          font-weight: bold;
        }
      }
    }

    .box-control-intitule {
      .invalidInput {
        border: 1px solid #ff0000;
      }

      input {
        width: 9rem;
        margin: 0.3rem 0 0;
        border: 1px solid #333;
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
    }

    .box-control-comments {
      // width: 90%;
      // margin: 0 auto;

      label {
        margin-top: 0.8rem;
        display: block;
        font-size: 0.9rem;
        font-weight: bold;
      }

      textarea {
        margin: 0.6rem 0 0;
        border: 1px solid #333;
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

  .invalid {
    margin-top: 0.5rem;
    color: red;
    font-size: 0.8rem;
  }
}
</style>
