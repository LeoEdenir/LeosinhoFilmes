<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">
      <div class="col-8">
        <h2 class="text-center mb-5 title-login">Cadastro</h2>
        <b-form>

          <b-form-group
            label="Nome"
            label-for="name"
          >
            <b-form-input
              id="name"
              type="text"
              placeholder="João Silva"
              autocomplete="off"
              v-model="form.name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="E-mail"
            label-for="email"
          >
            <b-form-input
              id="email"
              type="email"
              placeholder="joaosilva@email.com"
              autocomplete="off"
              v-model="form.email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-for="password"
            label="Senha"
          >
            <b-form-input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              v-model="form.password"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-for="confirm-password"
          >
            <label class="d-flex justify-content-between">
              Confirmar senha
            </label>

            <b-form-input
              id="confirm-password"
              type="password"
              placeholder="Confirme sua senha"
              v-model="form.confirmPassword"
            ></b-form-input>
          </b-form-group>

          <b-button
            type="button"
            variant="primary"
            block
            @click="register">
            <i class="fas fa-sign-in-alt"></i> Cadastrar
          </b-button>

          <hr>

          <b-button
            type="button"
            variant="outline-secondary"
            block
            @click="loginRedirect">
            <i class="fas fa-user-plus"></i> Já tenho conta
          </b-button>
        </b-form>
      </div>
    </b-col>
    <b-col sm="7" class="d-flex justify-content-center align-items-center">
      <img src="../../static/images/cadastro.svg" class="img-login" alt="login image"/>
    </b-col>
  </b-row>
</template>

<script>

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    }
  },

  methods: {
    loginRedirect() {
      this.$router.push('/login')
    },

    async register() {
      if (this.form.password !== this.form.confirmPassword) {
        return this.$toast.error("As senhas não coincidem!")
      }

      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.form.email,
          this.form.password
        )
        const { uid, email, emailVerified } = this.$fire.auth.currentUser

        const profile = await this.$fire.firestore.collection("profile").add({
          user_uid: this.$fire.auth.currentUser.uid,
          name: this.form.name,
          favorite_ids: []
        });
        const profileData = (await profile.get()).data()

        const userStore = { uid, email, emailVerified, profile: profileData }
        await this.$store.dispatch("auth/setUser", userStore);

        console.log(this.$store.state.auth.user)

        return this.$router.push('/catalogo')
      } catch (e) {
        return this.$toast.error(e.message)
      }
    },

  }
}
</script>

<style>

*, /*resetar o estilo da página*/
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.row-login {
  margin-left: 0;
}

.left-login {
  background-color: #F2F2F2;
}

.title-login {
  font-weight: bold;
}

.img-login {
  width: 600px;
  height: 600px;
}

</style>
