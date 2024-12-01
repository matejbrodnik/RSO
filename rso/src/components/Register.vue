<template>
    <v-card style="width: 200px;">
        <v-card-title>Register</v-card-title>
        <v-form @submit.prevent="handleRegister" >
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
            :value="'Register'"/>
        </v-form>
    </v-card>
    
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'Register',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async handleRegister() {
        try {
          const response = await axios.post('http://localhost:4000/register', {
            username: this.username,
            password: this.password,
          });
          // const response = await fetch('http://localhost:4000/register', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ username: this.username, password: this.password })
          // });
          console.log(response);
          // Store token or navigate to another page if needed
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
  