import Cookie from "js-cookie";

export default {
  async login(context) {
    context.commit("setError", false);
    context.commit("setErrorMessage", null);

    const data = {
      email: context.getters.connectionInfos.email,
      password: context.getters.connectionInfos.password,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        context.commit("setError", true);
        context.commit("setErrorMessage", responseData.message);
        return;
      }

      const remainingMilliseconds = 59 * 60 * 1000;
      // const remainingMilliseconds = 8000
      const expiryDate = new Date().getTime() + remainingMilliseconds;

      Cookie.set("jwt", responseData.token);
      Cookie.set("expiryDate", expiryDate);

      context.dispatch("autoLogout", remainingMilliseconds);

      context.commit("setToken", responseData.token);
      context.commit("setUserInfos", responseData.loadedUser);
      context.commit(
        "loadUserReservations",
        responseData.infosReservations
      );

      console.log(responseData.loadedUser)

      context.commit("setConnected", true);
    } catch (err) {
      console.log(err);
    }
  },

  async initAuth(context, req) {
    let token;
    let expirationDate;

    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("expiryDate="))
        .split("=")[1];

      try {
        const response = await fetch(
          "http://localhost:3000/auth/persistLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          console.log('initAuth')
          this.app.router.push("/login");
        }

        context.commit("setUserInfos", responseData.loadedUser);
        context.commit(
          "loadUserReservations",
          responseData.infosReservations
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      token = Cookie.get("jwt");
      expirationDate = Cookie.get("expiryDate");
    }

    if (new Date().getTime() > +expirationDate || !token) {
      console.log("No token or invalid token");
      context.dispatch("logout");
      return;
    }

    context.commit("setToken", token);
    context.commit("setConnected", true);
  },

  autoLogout(context, payload) {
    setTimeout(() => {
      context.dispatch("logout");
      if (this.app.router.history.current.path !== "/")
        this.app.router.push("/login");
    }, payload);
  },

  logout(context) {
    context.commit("setToken", null);
    context.commit("setUserInfos", null);
    context.commit("setUserReservations", null);
    context.commit("setConnected", false);

    Cookie.remove("jwt");
    Cookie.remove("expiryDate");
  },
};
