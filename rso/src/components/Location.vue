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
          <v-list-item @click="selected = NewLocation" style="font-size: large;" prepend-icon="mdi-map">
            <v-list-title>New location</v-list-title>
          </v-list-item>
          <v-list-item @click="selected = AllLocations" style="font-size: large;"prepend-icon="mdi-map-marker">
            <v-list-title>Your locations</v-list-title>
          </v-list-item>
          <v-list-item @click="selected = Alerts"style="font-size: large;" prepend-icon="mdi-alert-circle-outline">
            <v-list-title>Alerts</v-list-title>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="signOut"> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

    </v-layout>
</v-card>
<div style="margin-left: 65%; text-align: center;">
          <div id="map"></div>
          <v-btn
            class="bg-deep-purple mt-3"
            theme="dark"
            style="position: relative;"
            @click="setLocation"
          >
            Save Location
          </v-btn>
        </div>
</template>
  
<script>
  import axios from 'axios';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "MapComponent",
    data(){
      return {
        lat: 46.056946,
        lng: 14.505751,
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      async initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: this.lat, lng: this.lng },
          zoom: 9,
        });
  
        let marker = new google.maps.Marker({
          position: { lat: this.lat, lng: this.lng },
          map: map,
          title: "Hello World!",
        });

        google.maps.event.addListener(map, "click", event => {
            this.lat = event.latLng.lat();
            this.lng = event.latLng.lng();
            let lat = this.lat;
            let lng = this.lng;
            console.log(lat, lng);
            console.log(event);
            
            if (marker) {
                marker.setMap(null);
            }
            marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: `loc: ${lat}, ${lng}`,
            });
        })
      },
      async setLocation() {
        const response = await axios.post('http://localhost:4001/location', {
            uid: localStorage.getItem("uid") ?? 0,
            lat: this.lat,
            lng: this.lng,
          });
      }
    },
  });
  </script>
  
  <style>
  #map {
    border: 2px solid #ddd;
    height: 400px; 
    width: 600px;
  }
  </style>
  <style scoped>
  
  </style>
  