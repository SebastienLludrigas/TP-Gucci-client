<template>
  <section v-show="!displaySpinner" class="selection">
    <h2>Sélection</h2>
    <div class="selection-container">
      <div class="application-section">
        <div v-show="toggleAppChexboxesAll" class="application all">
          <input
            type="checkbox"
            :checked="allAppChecked"
            @change="allSelection"
          />
          <label for="">Tout</label>
        </div>
        <!-- <div class="application">
          <button @click="refresh">Voir</button>
          <label>V2</label>
        </div> -->
        <div
          v-for="application in applicationsList"
          :key="application.id_application"
          class="application"
        >
          <!-- <button>Voir</button> -->
          <input
            :id="application.id_application"
            type="checkbox"
            :checked="appChecked"
            @change="handleArrayFilter"
          />
          <label :for="application.id_application">{{ application.nom }}</label>
        </div>
      </div>
      <div class="couloir-section">
        <div v-show="toggleCouChexboxesAll" class="couloir all">
          <input
            type="checkbox"
            :checked="allCouChecked"
            @change="allSelection"
          />
          <label>Tout</label>
        </div>
        <div
          v-for="couloir in couloirsList"
          :key="couloir.id_couloir"
          class="couloir"
        >
          <input
            :id="couloir.id_couloir"
            type="checkbox"
            :checked="coChecked"
            @change="handleArrayFilter($event, 'couloirs')"
          />
          <label for="">{{ couloir.nom.split("-")[1] }}</label>
        </div>
      </div>
    </div>
    <button @click="refresh">Refresh</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      appChecked: true,
      coChecked: true,
      allCouChecked: true,
      allAppChecked: true,
      displayAppCheckboxesAll: true,
      displayCouCheckboxesAll: true,
    };
  },
  computed: {
    toggleAppChexboxesAll() {
      return this.displayAppCheckboxesAll;
    },
    toggleCouChexboxesAll() {
      return this.displayCouCheckboxesAll;
    },
    displaySpinner() {
      return this.$store.getters.displaySpinner;
    },
    applicationsList() {
      // console.log(this.$store.getters.applications)
      return this.$store.getters.applications;
    },
    couloirsList() {
      return this.$store.getters.couloirs;
    },
  },

  methods: {
    refresh() {
      this.$router.go();
    },

    // Méthode de gestion des cases "Tout"
    allSelection(event) {
      // Si la case Tout des applications ou des couloirs est cochée
      if (event.target.checked) {
        // On fait un refresh de l'application
        this.refresh();
      } else {
        // Sinon on passe les valeurs de toutes les cases à false
        this.allCouChecked = false;
        this.allAppChecked = false;
        this.appChecked = false;
        this.coChecked = false;
        // On vide le tableau complet et le tableau partiel
        this.$store.commit("setSelectionApp", []);
        this.$store.commit("setPartialSelectionApp", []);
        // On cache le bouton de réservation
        this.$store.commit("reservation/setStartReservation", false);
        // Et on réinitialise le compteur de rechargement
        this.$store.commit("setNbReload", 1);
      }
    },

    // Méthode de filtrage du contenu du tableau
    handleArrayFilter(event, cible = "applications") {
      let newArrayContent;
      let itemToAdd;

      // Si la case d'une appli ou d'un couloir est décochée
      if (!event.target.checked) {
        // On filtre sur le contenu courant du tableau en ne gardant que les items qui sont !==
        // de celui qui vient d'être décoché
        newArrayContent = this.$store.getters.selectionApp.filter(
          (item) =>
            (cible === "couloirs" ? item.id_couloir : item.id) !==
            +event.target.id
        );

        // On envoi le nouveau contenu du tableau au state
        this.$store.commit("setSelectionApp", newArrayContent);
        // Ainsi que le nouveau contenu du tableau partiel
        this.$store.commit(
          "setPartialSelectionApp",
          newArrayContent.filter((_, index) => index < 50)
        );
        // On réinitialise le compteur de rechargement du scroll infini
        this.$store.commit("setNbReload", 1);
        // On passe le reset du scroll à true afin que la barre de scroll remonte en haut du tableau
        this.$store.commit("setResetScrollTop", true);

        this.handleReservationButton(newArrayContent);

        // Si le contenu courant du tableau est différent du contenu initial
        if (
          newArrayContent.length !== this.$store.getters.permanentAppPlCo.length
        ) {
          // On fait disparaître les chexboxes "Tout" des applications et des couloirs pour limiter
          // les utilisations intempestives de ces 2 chexboxes par l'utilisateur
          this.displayAppCheckboxesAll = false;
          this.displayCouCheckboxesAll = false;
          // Sinon on les fait apparaître
        } else {
          this.displayAppCheckboxesAll = true;
          this.displayCouCheckboxesAll = true;
        }

        // Si la case décochée fait partie de la liste des applications
        if (cible === "applications") {
          // On modifie la liste des couloirs
          this.handleListAppAndCouFilter("couloirs");
          // Sinon on modifie la liste des applications
        } else {
          this.handleListAppAndCouFilter("applications");
        }
        // Sinon si la case d'une appli ou d'un couloir est cochée
      } else {
        // Si le tableau courant est vide on l'amorce avec l'item qui vient d'être coché
        if (this.$store.getters.selectionApp.length === 0) {
          // Si c'est une case application qui a été cochée on filtre sur les ids des applications
          // et on coche toutes les cases couloir dans lesquels l'application existe
          if (cible === "applications") {
            itemToAdd = this.$store.getters.permanentAppPlCo.filter(
              (item) => item.id === +event.target.id
            );
            this.allCouChecked = true;
            this.coChecked = true;
            // sinon on filtre sur les ids des couloirs et on coche toutes les cases application qui
            // existent dans le couloir coché
          } else {
            itemToAdd = this.$store.getters.permanentAppPlCo.filter(
              (item) => item.id_couloir === +event.target.id
            );
            this.allAppChecked = true;
            this.appChecked = true;
          }
          // Sinon si au moins un item est présent dans le tableau courant
        } else {
          // On créer un tableau dans lequel on va stocker les ids des applications du tableau courant
          // et un autre dans lequel on va stocker les ids des couloirs du tableau courant
          const idsApp = [];
          const idsCou = [];

          this.$store.getters.selectionApp.forEach((item) =>
            idsApp.push(item.id)
          );
          this.$store.getters.selectionApp.forEach((item) =>
            idsCou.push(item.id_couloir)
          );

          // On filtre sur le contenu de base du tableau
          itemToAdd = this.$store.getters.permanentAppPlCo.filter((item) => {
            // Si c'est une case couloir qui a été cochée
            if (cible === "couloirs") {
              // Si la case Tout des applications est cochée
              if (this.allAppChecked) {
                // On ne garde que les items qui ont le même id_couloir que l'item qui a été coché
                // OU les items qui sont déjà présent dans le tableau courant
                if (
                  item.id_couloir === +event.target.id ||
                  (idsCou.includes(item.id_couloir) && idsApp.includes(item.id))
                ) {
                  return true;
                }
                // Sinon si la case Tout des applications est décochée
              } else {
                // On ne garde que les items qui ont le même id_couloir que l'item qui a été coché et dont
                // l'id application est déjà présent dans le tableau courant OU les items qui sont déjà
                // présent dans le tableau courant
                if (
                  (item.id_couloir === +event.target.id &&
                    idsApp.includes(item.id)) ||
                  (idsCou.includes(item.id_couloir) && idsApp.includes(item.id))
                ) {
                  return true;
                }
              }
              // Sinon si c'est une case application qui a été cochée
            } else if (cible === "applications") {
              // Si la case Tout des applications est cochée
              if (this.allAppChecked) {
                // On ne garde que les items qui ont le même id App que l'item qui a été coché
                // et dont l'id_couloir est inclut dans le tableau courant OU les items qui sont déjà
                // présent dans le tableau courant
                if (
                  (item.id === +event.target.id &&
                    idsCou.includes(item.id_couloir)) ||
                  (idsCou.includes(item.id_couloir) && idsApp.includes(item.id))
                ) {
                  return true;
                }
              } else {
                // On garde les items qui ont le même id App que l'item qui a été coché OU les items
                // qui sont déjà présent dans le tableau courant
                if (
                  item.id === +event.target.id ||
                  (idsCou.includes(item.id_couloir) && idsApp.includes(item.id))
                ) {
                  return true;
                }
              }
            }
            // Si l'item courant ne correspond à aucun de ces cas de figure on ne le garde pas
            return false;
          });
        }
        // On envoi le nouveau contenu du tableau complet au state
        this.$store.commit("setSelectionApp", itemToAdd);
        // Ainsi que le nouveau contenu du tableau partiel
        this.$store.commit(
          "setPartialSelectionApp",
          itemToAdd.filter((_, index) => index < 50)
        );
        // On réinitialise le compteur de rechargement du scroll infini
        this.$store.commit("setNbReload", 1);
        // On passe le reset du scroll à true afin que la barre de scroll remonte en haut du tableau
        this.$store.commit("setResetScrollTop", true);

        this.handleReservationButton(itemToAdd);

        // Si le contenu courant du tableau est différent du contenu initial
        if (itemToAdd.length !== this.$store.getters.permanentAppPlCo.length) {
          // On fait disparaître les chexboxes "Tout" des applications et des couloirs pour limiter
          // les utilisations intempestives de ces 2 chexboxes par l'utilisateur
          this.displayAppCheckboxesAll = false;
          this.displayCouCheckboxesAll = false;
          // Sinon on les fait apparaître
        } else {
          this.displayAppCheckboxesAll = true;
          this.displayCouCheckboxesAll = true;
        }

        // Si la case cochée fait partie de la liste des applications
        if (cible === "applications") {
          // On modifie la liste des couloirs
          this.handleListAppAndCouFilter("couloirs");
          // Sinon on modifie la liste des applications
        } else {
          this.handleListAppAndCouFilter("applications");
        }
      }
    },

    handleListAppAndCouFilter(cible) {
      const ids = [];
      let newListContent = [];

      // Si la liste à modifier est celle des couloirs
      if (cible === "couloirs") {
        // On récupère les ids des couloirs présents dans le tableau complet courant
        this.$store.getters.selectionApp.forEach((item) =>
          ids.push(item.id_couloir)
        );
        // On filtre la liste complète des couloirs pour ne garder que celui/ceux dont l'id est inclut
        // dans notre tableau d'ids
        newListContent = this.$store.getters.permanentCouloirs.filter((item) =>
          ids.includes(item.id_couloir)
        );
        // On modifie la liste courante des couloirs avec notre nouvelle liste
        this.$store.commit("setCouloirs", newListContent);
        // Sinon si la liste à modifier est celle des applications
      } else {
        // On récupère les ids des applications présentent dans le tableau complet courant
        this.$store.getters.selectionApp.forEach((item) => ids.push(item.id));
        // On filtre la liste complète des applications pour ne garder que celle(s) dont l'id est inclut
        // dans notre tableau d'ids
        newListContent = this.$store.getters.permanentApplications.filter(
          (item) => ids.includes(item.id_application)
        );
        // On modifie la liste courante des applications avec notre nouvelle liste
        this.$store.commit("setApplications", newListContent);
      }
    },

    handleReservationButton(currentArray) {
      if (currentArray.length === 0) {
        this.$store.commit("reservation/setStartReservation", false);
      } else {
        const isThereOnlyOneCou = (currentArray) =>
          currentArray.every(
            (val) => val.id_couloir === currentArray[0].id_couloir
          );
        const result = isThereOnlyOneCou(currentArray);
        this.$store.commit("reservation/setStartReservation", result);
      }
    },
  },
};
</script>

<style scoped lang="scss">
//

.selection {
  display: flex;
  flex-direction: column;
  // max-width: 100%;
  // min-width: 16rem;
  width: 100%;

  button {
    margin: 0 auto;
    border-radius: 2px;
    font-size: 0.9rem;
    border: none;
    background-color: $vert-fonce;
    color: #fff;
    padding: 0.3rem 0.9rem;
    cursor: pointer;
  }

  h2 {
    margin: 0 auto;
  }

  .selection-container {
    display: flex;
    width: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
    padding: 0.7rem;
    border-radius: 3px;
    margin: 0.5rem 0;
    border: 0.5px solid $bleu-pastel;
  }

  .application-section {
    max-height: 78vh;
    height: fit-content;
    width: 80%;
    overflow-y: auto;

    .application {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 0.3rem;

      &.all {
        text-transform: uppercase;
        font-weight: bold;
      }

      input[type="checkbox"] {
        width: 0.7rem;
        margin-right: 0.5rem;
        cursor: pointer;
      }

      label {
        font-size: 0.9rem;
        margin: 0 0.5rem 0 0;
      }

      button {
        margin: 0 0.5rem 0 0;
        border-radius: 2px;
        font-size: 0.6rem;
        border: none;
        background-color: $vert;
        color: #fff;
        padding: 0.2rem 0.6rem;
        cursor: pointer;
      }
    }

    .all {
      // margin-left: 2.75rem;
    }
  }

  .couloir-section {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .couloir {
      display: flex;
      align-items: center;
      margin: 1rem 0;

      &.all {
        text-transform: uppercase;
        font-weight: bold;
      }

      label {
        // margin-left: 0.8rem;
        font-size: 0.8rem;
      }

      input[type="checkbox"] {
        width: 0.7rem;
        margin: 0 0.5rem 0.1rem;
        cursor: pointer;
      }
    }
  }
}
</style>
