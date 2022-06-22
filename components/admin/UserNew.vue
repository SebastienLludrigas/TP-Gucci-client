<template>
  <section class="create-user">
    <nuxt-link 
        to="/admin"
        class="return"
    ><i class="fa fa-arrow-left"></i></nuxt-link>
    <div class="dialog">
      <div v-show="success" class="success">
        <p>{{ successMessage }}</p>
      </div>
      <div v-show="error" class="error">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
    <div class="form-box">
      <form class="form" @submit.prevent="submitForm">
        <div class="box-control-name">
          <label for="name">
            Nom<br>
            <span class="info">minimum 3 caractères</span>
          </label>
          <input 
            id="name"
            v-model.trim="name.value" 
            :class="{ invalidBorder: !name.isValid }" 
            type="text"
            @focus="verif('name')"
            @input="verif('name')"
            @blur="verif('name', 'blur')" 
          />
          <p v-if="name.showErrorMessage" class="invalid">
            Attention au champ Nom !
          </p>
        </div>
        <div class="box-control-email">
          <label for="email">E-Mail</label>
          <input 
            id="email" 
            v-model.trim="email.value" 
            :class="{ invalidBorder: !email.isValid }" 
            type="email" 
            @focus="verif('email')"
            @input="verif('email')"
            @blur="verif('email', 'blur')" 
          />
          <p v-if="email.showErrorMessage" class="invalid">
            Attention au champ Email !
          </p>
        </div>
        <div class="box-control-password">
          <label for="password">
            Password<br>
            <span class="info">minimum 8 caractères</span>
          </label>
          <input 
            id="password" 
            v-model.trim="password.value" 
            :class="{ invalidBorder: !password.isValid }" 
            type="text"
            @focus="verif('password')"
            @input="verif('password')"
            @blur="verif('password', 'blur')" 
          />
          <p v-if="password.showErrorMessage" class="invalid">
            Attention au champ Password !
          </p>
        </div>
        <div class="box-control-fonction">
          <label for="fonction">
            Fonction<br>
            <span class="info">minimum 3 caractères</span>
          </label>
          <input 
            id="fonction" 
            v-model.trim="fonction.value" 
            :class="{ invalidBorder: !fonction.isValid }" 
            type="text"
            @focus="verif('fonction')"
            @input="verif('fonction')"
            @blur="verif('fonction', 'blur')"  
          />
          <p v-if="fonction.showErrorMessage" class="invalid">
            Attention au champ Fonction !
          </p>
        </div>
        <div class="box-control-telephone">
          <label for="telephone">
            Téléphone<br>
            <span class="info">format du type : 01-02-03-04-05 ou 01 02 03 04 05</span>
          </label>
          <input 
            id="telephone" 
            v-model.trim="telephone.value" 
            :class="{ invalidBorder: !telephone.isValid }" 
            type="tel"
            @focus="verif('telephone')"
            @input="verif('telephone')"
            @blur="verif('telephone', 'blur')" 
          />
          <p v-if="telephone.showErrorMessage" class="invalid">
            Attention au champ Téléphone !
          </p>
        </div>
        <div class="box-control-role">
          <label for="role">Rôle</label>
          <select 
            id="role" 
            v-model.trim="role.value"
            :class="{ invalidBorder: !role.isValid }" 
            @focus="verif('role')"
            @change="verif('role')"
            @blur="verif('role', 'blur')" 
          >
            <option disabled>Sélectionnez un rôle</option>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
          <p v-if="role.showErrorMessage" class="invalid">
            Attention au champ Rôle !
          </p>
        </div>
        <div class="box-control-status">
          <label for="status">Statut</label>
          <select 
            id="status" 
            v-model.trim="status.value"
            :class="{ invalidBorder: !status.isValid }" 
            @focus="verif('status')"
            @change="verif('status')"
            @blur="verif('status', 'blur')" 
          >
            <option disabled>Sélectionnez un statut</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
          <p v-if="status.showErrorMessage" class="invalid">
            Attention au champ Statut !
          </p>
        </div>
        <!-- <p v-if="!formIsValid" class="invalid">
          Tous les champs doivent être remplis
        </p> -->
        <button class="button">Valider</button>
      </form>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-useless-escape */
export default {
  data() {
    return {
      name: {
        value: '',
        isValid: true,
        showErrorMessage: false
      },
      email: {
        value: '',
        isValid: true,
        showErrorMessage: false
      },
      password: {
        value: '',
        isValid: true,
        showErrorMessage: false
      },
      fonction: {
        value: '',
        isValid: true,
        showErrorMessage: false
      },
      telephone: {
        value: '',
        isValid: true,
        showErrorMessage: false
      },
      role: {
        value: '',
        isValid: true,
        showErrorMessage: false
      },
      status: {
        value: '',
        isValid: true,
        showErrorMessage: false
      },
      formIsValid: true,
      // success: false,
    };
  },

  computed: {
    success() {
      return this.$store.getters["admin/success"];
    },
    successMessage() {
      return this.$store.getters["admin/successMessage"];
    },
    error() {
      return this.$store.getters["admin/error"];
    },

    errorMessage() {
      return this.$store.getters["admin/errorMessage"];
    },
  },

  beforeDestroy() {
    this.$store.commit("admin/setError", false);
    // this.success = false;
    this.name.value = "";
    this.email.value = "";
    this.password.value = "";
    this.fonction.value = "";
    this.telephone.value = "";
    this.role.value = "";
    this.status.value = "";
    this.$store.commit("admin/setUserCreateInfos", {
      name: "",
      email: "",
      password: "",
      fonction: "",
      telephone: "",
      role: "",
      status: ""
    });
  },

  methods: {
    verif(fieldName = null, typeOfVerif = null) {
      if (fieldName === 'name' || typeOfVerif === 'submit') {
        if (this.name.value.length < 3) {
          this.name.isValid = false;
          this.formIsValid = false;
          if (typeOfVerif === 'blur' || typeOfVerif === 'submit') this.name.showErrorMessage = true;
        } else {
          this.name.isValid = true;
          this.name.showErrorMessage = false;
          this.formIsValid = true;
        };
      };
      
      if (fieldName === 'email' || typeOfVerif === 'submit') {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email.value)) {
          this.email.isValid = false;
          this.formIsValid = false;
          if (typeOfVerif === 'blur' || typeOfVerif === 'submit') this.email.showErrorMessage = true;
        } else {
          this.email.isValid = true;
          this.email.showErrorMessage = false;
          this.formIsValid = true;
        };
      };
      
      if (fieldName === 'password' || typeOfVerif === 'submit') {
        if (this.password.value.length < 8) {
          this.password.isValid = false;
          this.formIsValid = false;
          if (typeOfVerif === 'blur' || typeOfVerif === 'submit') this.password.showErrorMessage = true; 
        } else {
          this.password.isValid = true;
          this.password.showErrorMessage = false;
          this.formIsValid = true;
        };
      }

      if (fieldName === 'fonction' || typeOfVerif === 'submit') {
        if (this.fonction.value.length < 3) {
          this.fonction.isValid = false;
          this.formIsValid = false;
          if (typeOfVerif === 'blur' || typeOfVerif === 'submit') this.fonction.showErrorMessage = true; 
        } else {
          this.fonction.isValid = true;
          this.fonction.showErrorMessage = false;
          this.formIsValid = true;
        };
      }

      if (fieldName === 'telephone' || typeOfVerif === 'submit') {
        // if (!/^\d{2}(-| )\d{2}(-| )\d{2}(-| )\d{2}(-| )\d{2}$/.test(this.telephone.value)) {
        if (this.telephone.value.length === 0) {
          // console.log(this.telephone.value.length)
          this.telephone.isValid = false;
          this.formIsValid = false;
          if (typeOfVerif === 'blur' || typeOfVerif === 'submit') this.telephone.showErrorMessage = true;
        } else {
          this.telephone.isValid = true;
          this.telephone.showErrorMessage = false;
          this.formIsValid = true;
        };
      }
      
      if (fieldName === 'role' || typeOfVerif === 'submit') {
        if (this.role.value !== 'user' && this.role.value !== 'admin') {
          this.role.isValid = false;
          this.formIsValid = false;
          if (typeOfVerif === 'blur' || typeOfVerif === 'submit') this.role.showErrorMessage = true;
        } else {
          this.role.isValid = true;
          this.role.showErrorMessage = false;
          this.formIsValid = true;
        };
      }
       
      if (fieldName === 'status' || typeOfVerif === 'submit') {
        if (this.status.value !== 'active' && this.status.value !== 'inactive') {
          this.status.isValid = false;
          this.formIsValid = false;
          if (typeOfVerif === 'blur' || typeOfVerif === 'submit') this.status.showErrorMessage = true;
        } else {
          this.status.isValid = true;
          this.status.showErrorMessage = false;
          this.formIsValid = true;
        };
      }

      // console.log(
      //   `name : value=${this.name.value}, ${this.name.isValid}\n`,
      //   `email : value=${this.email.value}, ${this.email.isValid}\n`,
      //   `password : value=${this.password.value}, ${this.password.isValid}\n`,
      //   `fonction : value=${this.fonction.value}, ${this.fonction.isValid}\n`,
      //   `telephone : value=${this.telephone.value}, ${this.telephone.isValid}\n`,
      //   `role : value=${this.role.value}, ${this.role.isValid}\n`,
      //   `status : value=${this.status.value}, ${this.status.isValid}\n`,
      //   `form : ${this.formIsValid}`
      // )
    },

    async submitForm() {
      console.log(this.formIsValid)
      this.verif(null, 'submit');

      if (!this.formIsValid) return;

      const data = {
        nom: this.name.value,
        email: this.email.value,
        password: this.password.value,
        fonction: this.fonction.value,
        telephone: this.telephone.value,
        role: this.role.value,
        status: this.status.value,
      };

      console.log(data);
      this.$store.commit("admin/setUserCreateInfos", data);

      console.log(this.$store.getters['admin/userCreateInfos'])

      await this.$store.dispatch("admin/userCreate");
    },
  },
};
</script>

<style scoped lang="scss">

.create-user {
  position: relative;

  .return {
    position: absolute;
    top: 1rem;
    left: 1rem;
    border-radius: 3px;
    font-size: 1rem;
    background-color: $vert-fonce;
    color: #fff;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  }
  .dialog {
    text-align: center;

    .error {
      display: inline-block;
      margin: 1.4rem auto 0;
      // width: 15rem;
      border-radius: 3px;
      padding: 0.6rem;
      background-color: rgb(255, 228, 232);
      border: 1px solid red;
      color: red;
    }

    .success {
      display: inline-block;
      margin: 1.4rem auto 0;
      width: 15rem;
      border-radius: 3px;
      padding: 0.6rem;
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
    width: 20rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
    padding: 0.6rem 0.8rem 0.8rem;
    border-radius: 3px;
    border: 0.5px solid $bleu-pastel;
    background-color: #fff;

    .form {
      .box-control-name,
      .box-control-email,
      .box-control-password,
      .box-control-fonction,
      .box-control-telephone,
      .box-control-role,
      .box-control-status {
        width: 15rem;
        margin: 0 auto;

        input {
          width: 15rem;
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

          &.invalidBorder {
            border-color: red;
            background-color: rgb(252, 233, 233);
          }
        }

        label {
          margin-top: 0.8rem;
          display: block;
          font-size: 0.9rem;
          font-weight: bold;

          .info {
            margin-top: 0.3rem;
            font-size: 0.6rem;
            font-weight: normal;
            color: gray;
          }
        }
      }

      .box-control-role select,
      .box-control-status select {

        &:focus {
          border-color: $vert;
          background-color: rgba(80, 150, 241, 0.12);
          outline: none;

          &.invalidBorder {
            border-color: red;
            background-color: rgb(252, 233, 233);
          }
        }
      }
    }
  }

  .button {
    border-radius: 2px;
    margin: 1rem 0 0 1.8rem;
    font-size: 0.8rem;
    border: none;
    color: #fff;
    padding: 0.3rem 0.5rem 0.2rem;
    cursor: pointer;
    background-color: $vert-fonce;
  }

  .invalid {
    margin-top: 0.5rem;
    color: red;
    font-size: 0.8rem;
  }
}
</style>
