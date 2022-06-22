<template>
  <header class="header">
    <div class="logo-urssaf">
      <img src="~/assets/images/logo-urssaf.png" alt="logo urssaf" />
    </div>
    <nuxt-link to="/">
      <h1 class="title">
        Gucci
        <span class="version">Version : V3.1</span>
      </h1>
    </nuxt-link>
    <nav class="navbar">
      <ul>
        <li v-if="isAdmin">
          <nuxt-link to="/admin"> Admin </nuxt-link>
        </li>
        <li v-if="!isConnected">
          <nuxt-link to="/login"> Connexion </nuxt-link>
        </li>
        <li v-else class="logout" @click="logout">Déconnexion</li>
        <li v-if="isConnected">
          <nuxt-link to="/reservation-list"> Mes réservations </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isConnected() {
      return this.$store.getters["auth/connected"];
    },

    isAdmin() {
      if (this.$store.getters["auth/userInfos"]) {
        return (
          this.$store.getters["auth/connected"] &&
          this.$store.getters["auth/userInfos"].role === 'admin'
        );
      } else {
        return false
      }
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="scss">
//

.header {
  width: 100%;
  height: 6rem;
  padding: 0 1rem;
  background-color: rgba(80, 150, 241, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $bleu;

  .logo-urssaf img {
    margin-top: 1rem;
    min-width: 8rem;
    width: 8rem;
  }

  .title {
    color: $bleu;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.5rem;
    margin: 0 5rem 0 15rem;
  }

  .version {
    font-size: 0.5rem;
    color: #333;
    font-weight: normal;
  }

  .navbar {
    align-self: flex-end;
    margin-bottom: 1rem;

    ul {
      // width: 26.5rem;
      display: flex;
      margin-right: 1rem;

      li {
        margin: 0 0.5rem;

        a {
          color: #333;

          &:hover,
          &.nuxt-link-active {
            color: $vert;
          }
        }
      }
    }

    .logout {
      cursor: pointer;
    }
  }
}
</style>
