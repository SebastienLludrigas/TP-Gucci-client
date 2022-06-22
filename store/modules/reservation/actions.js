export default {
  setInfoResa(context, payload) {
    console.log(payload);
    const data = {
      ...payload,
      id_habilite: context.rootGetters["auth/userInfos"].id_habilite,
      selection: context.rootGetters.selectionApp,
    };

    console.log(data);

    context.commit("setInfoResa", data);

    // console.log(context.rootGetters['auth/userInfos'].id_habilite)
  },

  async creationReservation(context) {
    console.log("It works !");
    const token = context.rootGetters["auth/token"];
    const payload = context.getters.reservationInfo;

    // console.log(payload);

    const newReservation = {
      intitule: payload.intitule,
      comments: payload.comments,
      id_habilite: payload.id_habilite,
      date_debut: payload.start,
      date_fin: payload.end,
      selection: payload.selection,
    };

    const response = await fetch(
      "http://localhost:3000/reservation/creation",
      {
        method: "POST",

        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      }
    );
    const responseData = await response.json();

    console.log(responseData);
    console.log(response);

    if (!response.ok && response.status === 401) {
      context.commit("setErrorMessage", responseData.message);
      context.commit("setCreateError", true);
      setTimeout(() => {
        context.commit(
          "reservation/setDisplayModalResaSummary",
          false,
          { root: true }
        );
        context.commit("setCreateError", false);
        context.dispatch("auth/logout", null, { root: true });
        // context.commit('auth/setConnected', false, { root: true })
        // this.app.router.push('/login')
        return;
      }, 3000);
    }

    if (!response.ok && response.status === 500) {
      context.commit(
        "setErrorMessage",
        "La création de la réservation a échoué, veuillez réessayer"
      );
      context.commit("setCreateError", true);
      setTimeout(() => {
        context.commit(
          "reservation/setDisplayModalResaSummary",
          false,
          { root: true }
        );
        context.commit("setCreateError", false);
        return;
      }, 3000);
    }
  },

  async updateReservation(context, kindOfUpdate) {
    const token = context.rootGetters["auth/token"];
    const idResa =
               context.rootGetters["reservation/currentReservationId"];
    const data = context.getters.newValueForUpdate;
    console.log(JSON.stringify(data), idResa);

    try {
      const response = await fetch(
        `http://localhost:3000/reservation/update/${idResa}`,
        {
          method: "POST",

          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();

      console.log(responseData);
      console.log(response);

      if (!response.ok && response.status === 401) {
        context.commit(`setUpdate${kindOfUpdate}`, false);
        context.commit("setErrorMessage", responseData.message);
        context.commit("setUpdateError", true);
        setTimeout(() => {
          context.commit("setDisplayModalUpdate", false);
          context.commit("setUpdateError", false);
          context.dispatch("auth/logout", null, { root: true });
          // context.commit('auth/setConnected', false, { root: true })
          // this.app.router.push('/login')
          return;
        }, 3000);
      }

      if (!response.ok && response.status === 500) {
        // const error = new Error(responseData.message, responseData.message.detail || 'Creation of the reservation failed !')
        // throw error
        console.log(`setUpdate${kindOfUpdate}`);
        context.commit(`setUpdate${kindOfUpdate}`, false);
        context.commit(
          "setErrorMessage",
          "La mise à jour a échoué, veuillez réessayer"
        );
        context.commit("setUpdateError", true);
        setTimeout(() => {
          context.commit("setDisplayModalUpdate", false);
          context.commit("setUpdateError", false);
          return;
        }, 3000);
      }

      // context.commit('auth/loadUserReservations', responseData.infosReservations, { root: true })
    } catch (err) {
      console.log(err);
    }
  },

  async deleteOneReservedApplication(context) {
    const token = context.rootGetters["auth/token"];
    const idHabilite = context.rootGetters["auth/userInfos"].id_habilite;
    const { idResa, idCouloir, idPlateforme, idApplication } =
               context.rootGetters["reservation/deleteInfos"];

    try {
      const response = await fetch(
        `http://localhost:3000/reservation/deleteOne/${idHabilite}/${idResa}/${idCouloir}/${idPlateforme}/${idApplication}`,
        {
          method: "DELETE",

          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      console.log(responseData);
      console.log(response);

      if (!response.ok && response.status === 401) {
        context.commit("setErrorMessage", responseData.message);
        context.commit("setDeleteError", true);
        setTimeout(() => {
          context.commit("setDisplayModalDelete", false);
          context.commit("setDeleteError", false);
          context.dispatch("auth/logout", null, { root: true });
          // context.commit('auth/setConnected', false, { root: true })
          // this.app.router.push('/login')
          return;
        }, 3000);
      }

      if (!response.ok && response.status === 500) {
        context.commit(
          "setErrorMessage",
          "La suppression a échoué, veuillez réessayer"
        );
        context.commit("setDeleteError", true);
        setTimeout(() => {
          context.commit("setDisplayModalDelete", false);
          context.commit("setDeleteError", false);
          return;
        }, 3000);
      }

      // context.commit('auth/loadUserReservations', responseData.infosReservations, { root: true })
    } catch (err) {}
  },

  async deleteEntireReservation(context) {
    const token = context.rootGetters["auth/token"];
    const idHabilite = context.rootGetters["auth/userInfos"].id_habilite;
    const idResa = context.rootGetters["reservation/deleteInfos"];

    try {
      const response = await fetch(
                    `http://localhost:3000/reservation/deleteAll/${idHabilite}/${idResa}`,
                    {
                      method: "DELETE",

                      headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                      },
                    }
      );

      const responseData = await response.json();

      console.log(responseData);
      console.log(response);

      if (!response.ok && response.status === 401) {
        context.commit("setErrorMessage", responseData.message);
        context.commit("setDeleteError", true);
        setTimeout(() => {
          context.commit("setDisplayModalDelete", false);
          context.commit("setDeleteError", false);
          context.dispatch("auth/logout", null, { root: true });
          // context.commit('auth/setConnected', false, { root: true })
          // this.app.router.push('/login')
          return;
        }, 3000);
      }

      if (!response.ok && response.status === 500) {
        context.commit(
          "setErrorMessage",
          "La suppression a échoué, veuillez réessayer"
        );
        context.commit("setDeleteError", true);
        setTimeout(() => {
          context.commit("setDisplayModalDelete", false);
          context.commit("setDeleteError", false);
          return;
        }, 3000);
      }

      // context.commit('auth/loadUserReservations', responseData.infosReservations, { root: true })
    } catch (err) {}
  },

  async loadInfosResas(context) {
    const response = await fetch(
      "http://localhost:3000/reservation/infos"
    );
    const responseData = await response.json();
    // console.log(responseData.infosResas)

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch !"
      );
      throw error;
    }
    context.commit("loadInfosResas", responseData.infosResas);
    // context.commit("admin/loadReservations", responseData.infosResas, { root: true });
  },

  async getResasAfterUpdate(context) {
    const token = context.rootGetters["auth/token"];

    const response = await fetch(
      "http://localhost:3000/reservation/updatedReservations",
      {
        method: "GET",

        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    // console.log(responseData.infosResas)

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch !"
      );
      throw error;
    } 

    context.commit("auth/loadUserReservations", responseData.infosReservations, { root: true });
  }
};
