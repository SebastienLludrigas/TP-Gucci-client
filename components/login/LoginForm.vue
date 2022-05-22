<template>
  <section class="login">
    <div
      v-show="success"
      class="dialog success"
    >
      <p class="success-message">
        Authentification réussi
      </p>
    </div>
    <div
      v-show="error"
      class="dialog error"
    >
      <p class="error-message">
        {{ errorMessage }}
      </p>
    </div>
    <div class="form-box">
      <form class="form" @submit.prevent="submitForm">
        <div class="box-control-email">
          <label for="email">E-Mail</label>
          <input
            id="email"
            v-model.trim="email"
            type="email"
          >
        </div>
        <div class="box-control-password">
          <label for="password">Password</label>
          <input
            id="password"
            v-model.trim="password"
            type="text"
          >
        </div>
        <p
          v-if="!formIsValid"
          class="invalid"
        >
          Tous les champs doivent être remplis
        </p>
        <button class="button">
          Valider
        </button>
      </form>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
export default {
  data () {
    return {
      email: '',
      password: '',
      formIsValid: true,
      success: false
    }
  },

  computed: {
    error () {
      return this.$store.getters['auth/error']
    },

    errorMessage () {
      return this.$store.getters['auth/errorMessage']
    }
  },

  beforeDestroy () {
    this.$store.commit('auth/setError', false)
    this.success = false
    this.email = ''
    this.password = ''
    this.$store.commit('auth/setConnectionInfos', {
      email: '',
      password: ''
    })
  },

  methods: {
    async submitForm () {
      this.formIsValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password === ''
      ) {
        this.formIsValid = false
        return
      }

      const data = {
        email: this.email,
        password: this.password
      }

      this.$store.commit('auth/setConnectionInfos', data)
      // console.log(this.$store.getters['auth/connectionInfos'])
      await this.$store.dispatch('auth/login')

      if (this.$store.getters['auth/connected']) {
        this.success = true
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  .dialog {
    margin: 0.8rem auto 0;
    width: 15rem;
    border-radius: 3px;
    padding: 0.6rem;
    text-align: center;

    &.error {
      background-color: rgb(255, 228, 232);
      border: 1px solid red;
      color: red;
    }

    &.success {
      background-color: rgb(228, 255, 234);
      border: 1px solid green;
      color: green;
    }
  }

  .form-box {
    position: fixed;
    top: 20%;
    transform: translateY(-50%);
    left: 50%;
    transform: translateX(-50%);
    width: 17rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
    padding: 0.6rem 0.8rem 0.8rem;
    border-radius: 3px;
    border: 0.5px solid $bleu-pastel;
    background-color: #fff;

    .form {
      .box-control-email,
      .box-control-password {
        width: 13rem;
        margin: 0 auto;

        input {
          width: 13rem;
          margin: 0.3rem 0 0;
          border: 1px solid #ccc;
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

      .box-control-email:first-child {
        label {
          margin: 0;
        }
      }
    }
  }

  .button {
    border-radius: 2px;
    margin: 1rem 0 0 1.2rem;
    font-size: 0.8rem;
    border: none;
    color: #fff;
    padding: 0.3rem 0.5rem 0.2rem;
    cursor: pointer;
    background-color: $vert-fonce;
  }

  .invalid {
    margin: 1rem 0 0 1.2rem;
    color: red;
    font-size: 0.8rem;
  }
}
</style>
