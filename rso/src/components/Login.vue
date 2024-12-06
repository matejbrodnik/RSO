<template>
    <v-card>
        <v-card-title>Login</v-card-title>
        <v-form @submit.prevent="handleLogin" >
            <v-text-field
            required
            type="username"
            placeholder="Username"
            v-model="username" />
            <v-text-field
            required
            type="password"
            placeholder="Password"
            v-model="password" />
            <v-text-field
            type="submit"
            :value="'Sign in'"/>
            <router-link to="/register"
            >Don't have an account? Sign up</router-link
            >
        </v-form>
    </v-card>
    
</template>
  
<script>
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('http://localhost:4000/login', {
            username: this.username,
            password: this.password,
          });
          console.log(response)
          if(response.data.redirect) {
            localStorage.setItem("uid", response.data.uid)
            this.$router.push(response.data.redirect)
          }
        } catch (error) {
          if (error.response) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      },
    },
  });
</script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  