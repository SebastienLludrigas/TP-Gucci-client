<template>
  <div class="container">
    <section id="scroll-container" class="container-array">
      <table class="table">
        <thead>
          <tr>
            <th class="col-sticky hidden" colspan="3" />
            <th
              v-for="week in weeks"
              :key="week.key"
              class="col-sticky week"
              :colspan="week.colspan"
            >
              {{ week.name }}
            </th>
          </tr>
          <tr>
            <th class="col-sticky couloir head">Couloir</th>
            <th class="col-sticky plateforme head">Plateforme</th>
            <th class="col-sticky application head">Application</th>
            <th v-for="day in days" :key="day.date" class="col-sticky day">
              {{ day.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in arrayContent"
            :key="`${item.id_couloir}${item.id_plateforme}${item.id}`"
          >
            <td
              v-if="item.displayCouloir"
              :rowspan="item.couloirRowspan"
              class="col-sticky couloir"
              scope="row"
            >
              {{ item.nom_couloir.split("-")[1] }}
            </td>
            <td
              v-if="item.displayPlatform"
              :rowspan="item.platformRowspan"
              class="col-sticky plateforme"
              scope="row"
            >
              {{ item.nom_plateforme }}
            </td>
            <td
              class="col-sticky application"
              scope="row"
              :class="[
                item.borderAppTop ? 'darkerBorderTop' : '',
                item.borderAppBottom ? 'darkerBorderBottom' : '',
              ]"
            >
              {{ item.nom_application }}
            </td>
            <td
              v-for="day in days"
              :key="day.date"
              class="day"
              :class="[
                item.borderCellTop ? 'darkerBorderTop' : '',
                item.borderCellBottom ? 'darkerBorderBottom' : '',
                day.borderLeft ? 'darkerBorderLeft' : '',
                day.borderRight ? 'darkerBorderRight' : '',
                displayResaBanner(item, day.date).display ? 'resaCell' : '',
              ]"
              @click="openModal(item, day.date)"
            >
              <span
                v-if="displayResaBanner(item, day.date).displayIntitule"
                class="nameResaEven"
              >
                {{ displayResaBanner(item, day.date).intitule }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <button v-if="startReservation" @click="displayModal">Je réserve</button>
  </div>
</template>

<script>
import dayjs from "dayjs";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

export default {
  data() {
    return {
      currentInfoResa: {},
      result: false,
      stopInfiniteScrolling: false,
    };
  },
  computed: {
    weeks() {
      // console.log(this.$store.getters.arrayWeeks)
      return this.$store.getters.arrayWeeks;
    },
    days() {
      // console.log(this.$store.getters.arrayDays)
      return this.$store.getters.arrayDays;
    },
    arrayContent() {
      // console.log(this.$store.getters.permanentAppPlCo)
      return this.$store.getters.partialSelectionApp;
    },
    startReservation() {
      // console.log(this.$store.getters['reservation/startReservation'], 'line 160')
      return (
        this.$store.getters["reservation/startReservation"] &&
        this.$store.getters["auth/connected"]
      );
    },
  },
  mounted() {
    this.getNextArrayContent();
  },
  updated() {
    this.resetScroll();
  },
  methods: {
    // Méthode permettant de gérer le reset du scroll
    resetScroll() {
      // Si le reset du scroll est à true
      if (this.$store.getters.resetScrollTop) {
        // On repasse le scrollTop à 0 pour remonter la barre de scroll en haut du tableau
        document.querySelector("#scroll-container").scrollTop = 0;
        // Ensuite on repasse le reset du scroll à false
        this.$store.commit("setResetScrollTop", false);
      }
    },
    // Méthode permettant de gérer le scroll infini
    getNextArrayContent() {
      const arrayScroll = document.querySelector("#scroll-container");
      arrayScroll.addEventListener("scroll", (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        // Si le tableau partiel === le tableau complet, cela veut dire que l'on a récupéré toutes
        // les données dans le tableau partiel, on stoppe donc le scroll infini
        if (
          this.$store.getters.partialSelectionApp.length ===
          this.$store.getters.selectionApp.length
        ) {
          this.stopInfiniteScrolling = true;
          // Sinon on continu le scroll infini
        } else {
          this.stopInfiniteScrolling = false;
        }

        // Si la hauteur totale du scroll du tableau + l'emplacement courant de la barre de scroll
        // est supérieur à la hauteur totale du tableau (overflow compris) moins 300px * le
        // nombre de reload ET si le stopInfiniteScrolling est à false, on déclenche le chargement
        // d'un nouveau paquet de données dans le tableau
        if (
          clientHeight + scrollTop >=
            scrollHeight - 300 * this.$store.getters.nbReload &&
          !this.stopInfiniteScrolling
        ) {
          // console.log(this.$store.getters.nbReload)

          // Limite basse du nombre de lignes à charger
          const down = this.$store.getters.nbReload * 50;

          // Limite haute du nombre de lignes à charger
          const up = down + 50;

          // On filtre sur le tableau complet pour ne garder que les lignes qui correspondent
          // à la partie des données à recharger
          const contentToAdd = this.$store.getters.selectionApp.filter(
            (_, index) => index >= down && index < up
          );

          // On ajoute ces nouvelles données au contenu du tableau partiel courant dans un nouveau
          // tableau
          const newArrayContent = [
            ...this.$store.getters.partialSelectionApp,
            ...contentToAdd,
          ];

          // On met à jour le tableau partiel avec ce nouveau tableau
          this.$store.commit("setPartialSelectionApp", newArrayContent);
          // On incrémente le compteur de rechargement
          this.$store.commit("setNbReload", this.$store.getters.nbReload + 1);
        }
      });
    },
    openModal(item, dayDate) {
      this.$store.commit(
        "reservation/setInfosResaModal",
        this.displayResaBanner(item, dayDate).infosResa
      );
      this.$store.commit("reservation/setDisplayModalResaInfo", true);
    },
    displayModal() {
      this.$store.commit("reservation/setDisplayModalForm", true);
    },
    displayResaBanner(currentRow, currentDay) {
      const infosResas = this.$store.getters["reservation/infosResas"];
      const info = {
        display: false,
      };
      for (let i = 0; i < infosResas.length; i++) {
        // console.log(item.date_debut);
        if (
          currentRow.id_couloir === infosResas[i].id_couloir &&
          currentRow.id_plateforme === infosResas[i].id_plateforme &&
          currentRow.id === infosResas[i].id_application
        ) {
          if (
            dayjs(currentDay).isBetween(
              dayjs(infosResas[i].date_debut),
              dayjs(infosResas[i].date_fin),
              null,
              "[ ]"
            )
          ) {
            info.display = true;
            info.displayIntitule =
              dayjs(
                dayjs(infosResas[i].date_debut).add(
                  Math.floor(infosResas[i].nbJoursReservation / 2),
                  "day"
                )
              ).format("YYYY-MM-DD") === currentDay;
            info.intitule = infosResas[i].intitule;
            info.nbDaysResaIsEven = infosResas[i].nbJoursReservation % 2 === 0;
            info.idResa = infosResas[i].id_reservation;
            info.infosResa = infosResas[i];
            info.idResaAndDisplayIntitule = {
              displayIntitule:
                dayjs(
                  dayjs(infosResas[i].date_debut).add(
                    Math.floor(infosResas[i].nbJoursReservation / 2),
                    "day"
                  )
                ).format("YYYY-MM-DD") === currentDay,
              idResa: infosResas[i].id_reservation,
            };
          }
        }
      }
      return info;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 95%;
  height: 71vh;
  margin: 2rem auto 1rem;
}

button {
  margin: 0.7em auto;
  border-radius: 2px;
  font-size: 0.9rem;
  border: none;
  background-color: $vert-fonce;
  color: #fff;
  padding: 0.3rem 0.9rem;
  cursor: pointer;
  display: block;
}

.container-array {
  max-height: 100%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.26);
  overflow: auto;

  .table {
    border-collapse: separate;
    border-spacing: 0;
    font-size: 14px;
  }

  th {
    top: 0;
    position: sticky;
    background-color: $bleu;
    color: #fff;
    z-index: 30;
    min-height: 30px;
    height: 30px;
    border: 1px solid rgb(151, 151, 151);
    text-align: center;
    vertical-align: middle;
    padding: 0;
  }

  tr {
    min-height: 25px;
    height: 25px;

    &:nth-child(even) {
      background-color: #f2f2f2;
    }

    &:nth-child(even) td[scope="row"] {
      background-color: white;
    }

    &:nth-child(odd) td[scope="row"] {
      background-color: white;
    }
  }

  td {
    border: 1px solid rgb(226, 226, 226);
    text-align: center;
    vertical-align: middle;

    &.col-sticky.couloir {
      background-color: white;
    }

    & span {
      display: none;
    }

    // &.day {
    //   border: none;
    // }
  }

  .resaCell {
    position: relative;
    border-left: none;
    border-right: none;
    background-color: $vert-pastel;
    cursor: pointer;

    & span {
      display: block;

      &.nameResaOdd {
        position: absolute;
        width: 200px;
        z-index: 10;
        top: 15%;
        transform: translateY(-50%);
        left: 50%;
        transform: translateX(-50%);
        color: #333;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
      }

      &.nameResaEven {
        position: absolute;
        width: 200px;
        z-index: 10;
        top: 15%;
        transform: translateY(-50%);
        left: 0%;
        transform: translateX(-50%);
        color: #333;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }

  .col-sticky {
    position: sticky;

    &.hidden {
      left: 0;
      min-width: 430px;
      width: 430px;
      background-color: white;
      outline: none;
      z-index: 50;
      border: none;
    }

    &.couloir {
      z-index: 40;
      left: 0;
      font-weight: bold;
      min-width: 100px;
      border: 1px solid rgb(151, 151, 151);
      border-left: 2px solid rgb(151, 151, 151);
    }

    &.plateforme {
      z-index: 40;
      left: 100px;
      min-width: 170px;
      border: 1px solid rgb(151, 151, 151);
    }

    &.application {
      z-index: 40;
      left: 270px;
      min-width: 200px;
      border-left: 1px solid rgb(151, 151, 151);
      border-right: 2px solid rgb(151, 151, 151);
    }

    &.head {
      top: 30px;
      z-index: 50;
      font-weight: bold;
    }

    &.day {
      top: 30px;
      min-width: 40px;
    }
  }

  .start-couloir-row > td:first-child {
    border-bottom: 2px solid rgb(151, 151, 151);
  }

  .end-couloir-row > td {
    border-bottom: 2px solid rgb(151, 151, 151);
  }

  .darkerBorderTop {
    border-top: 1px solid rgb(151, 151, 151);
  }

  .darkerBorderBottom {
    border-bottom: 1px solid rgb(151, 151, 151);
  }

  .darkerBorderLeft {
    border-left: 1px solid rgb(151, 151, 151);
  }

  .darkerBorderRight {
    border-right: 1px solid rgb(151, 151, 151);
  }
}
</style>
