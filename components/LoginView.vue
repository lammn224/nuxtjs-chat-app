<template>
  <div class="login">
    <div v-if="proccessing" class="text-center">Please wait...</div>
    <div v-if="message" class="text-center">{{ message }}</div>

    <b-form-input
      v-model="username"
      type="text"
      class="input-form"
      placeholder="Username"
    >
    </b-form-input>

    <b-form-input
      v-model="password"
      class="input-form"
      type="password"
      placeholder="Password"
    >
    </b-form-input>

    <b-button variant="primary" class="btn-block" @click="login">
      Log in
    </b-button>
  </div>
</template>

<script>
  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: '',
        proccessing: false,
        message: '',
      }
    },
    methods: {
      async login() {
        this.proccessing = true
        try {
          const res = await this.$axios.post('/auth/login', {
            username: this.username,
            password: this.password,
          })

          const { data } = res

          if (data.access_token) {
            this.proccessing = false
            this.$emit('authenticated', true, data) 
          }
          else {
            this.message = 'Something went wrong'
          }
          
        } catch (error) {
          this.message = 'Wrong username or password'
          this.proccessing = false
        }

      },
    },
  }
</script>
  
<style scoped>
  .login {
    width: 500px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
  .input-form {
    margin-bottom: 9px;
  }
</style>