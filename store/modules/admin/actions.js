export default {
  async fetchUsersWithAllInfos (context) {
    console.log('fetchUsers')
    const response = await fetch('http://localhost:3000/admin/userList');
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch !');
      throw error;
    };
    context.commit('loadUsers', responseData.allUsersInfos);

    // console.log(context.getters.users);
  },

  async userCreate (context) {
    const token = context.rootGetters["auth/token"];
    const data = context.getters.userCreateInfos;
    console.log(data)

    try {
      const response = await fetch('http://localhost:3000/admin/createUser', 
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

      if (!response.ok) {
        const status = response.status;
        let message;

        status === 500  
          ? message = "La création de l'utilisateur a échouée, veuillez réessayer" 
          : message = responseData.message;

        context.commit('setError', true);
        context.commit('setErrorMessage', message);
        setTimeout(() => {
          context.commit('setError', false);
        }, 4000);
      } else {
        context.commit('setSuccess', true);
        context.commit('setSuccessMessage', `Le nouvel utilisateur ${responseData.newUser[0].nom} a bien été créé !`);

        await context.dispatch('fetchUsersWithAllInfos');

        setTimeout(() => {
          context.commit('setSuccess', false);
        }, 4000);
      }

      console.log(responseData)
      console.log(response)
      // context.commit('setUserCreateInfos', responseData.user);
    } catch (err) {
      console.log(err);
      context.commit('setError', true);
      context.commit('setErrorMessage', '! Une erreur réseau est survenue, veuillez réessayer');
      setTimeout(() => {
        context.commit('setError', false);
      }, 4000);
    }
  }
}