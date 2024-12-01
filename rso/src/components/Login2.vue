<!-- <template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template> -->
<!-- 
  <template>
    <form class="flex items-center justify-center min-h-screen" @submit.prevent="handleLogin">
      <div class="flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <input
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
          required
          type="username"
          placeholder="Username"
          v-model="user" />
        <input
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
          required
          type="password"
          placeholder="Password"
          v-model="password" />
        <input
          class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700e"
          type="submit"
          :value="'Sign in'"/>
        <router-link to="/register" class="mt-4 text-blue-500 hover:text-blue-700"
          >Don't have an account? Sign up</router-link
        >
      </div>
    </form>
</template> -->
  


<template>
    <v-card>
        <v-card-title>Login2</v-card-title>
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
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'Login2',
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
          alert(response.data.message);
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
  