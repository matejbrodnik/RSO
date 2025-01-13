<template>
    <v-card>
        <v-layout>
        <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent>
            <v-list>
            <v-list-item>
                <v-list-title style="font-weight: 600; font-size: larger;" >Weather App</v-list-title>
            </v-list-item>
            </v-list>
            <v-divider :thickness="4"></v-divider>
            <v-list>
            <v-list-item @click="$router.push('/home');" style="font-size: large;" prepend-icon="mdi-map">
                <v-list-title>New location</v-list-title>
            </v-list-item>
            <v-list-item @click="$router.push('/locationlist');" style="font-size: large;"prepend-icon="mdi-map-marker">
                <v-list-title>Your locations</v-list-title>
            </v-list-item>
            <!-- <v-list-item @click="selected = Alerts"style="font-size: large;" prepend-icon="mdi-alert-circle-outline">
                <v-list-title>Alerts</v-list-title>
            </v-list-item> -->
            </v-list>
            <template v-slot:append>
            <div class="pa-2">
                <v-btn block @click="localStorage.setItem('uid', null);this.$router.push('/login');"> Logout </v-btn>
            </div>
            </template>
        </v-navigation-drawer>

        </v-layout>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        function newLocation() {
            this.$router.push('/home');
        }

        function listLocations() {
            this.$router.push('/locationlist');
        }

        function signOut() {
            localStorage.setItem("uid", null);
            this.$router.push('/login');
        }

        return {
            newLocation,
            listLocations,
            signOut,
        };
  },
});
</script>