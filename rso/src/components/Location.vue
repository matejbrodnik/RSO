<template>
<Navigation/>
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
  import Navigation from './Navigation.vue';
  import dotenv from 'dotenv';

  export default defineComponent({
    name: "MapComponent",
    data(){
      return {
        lat: 46.056946,
        lng: 14.505751,
      }
    },
    components: {
      Navigation,
    },
    mounted() {
      const key = localStorage.getItem("key");
      console.log(process.env);
      console.log(process.env.VITE_KEY);
      console.log(import.meta.env);
      console.log(key);
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?VITE_KEY=${key}`;
      script.async = true;
      script.onload = () => {
        this.initMap();
      };
      document.head.appendChild(script);
    },
    methods: {
      async initMap() {
        console.log(process.env);
        console.log(process.env.VITE_KEY);
        console.log(import.meta.env.VITE_KEY);
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
            console.log(process.env);
            console.log(process.env.VITE_KEY);
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
        const key = localStorage.getItem("key");
        console.log(process.env);
        console.log(process.env.VITE_KEY);
        console.log(import.meta.env);
        console.log(key);
        console.log(window.location.href);
        if (!window.location.href.includes('localhost')) {
          const response = await axios.post('/api/location', {
              uid: localStorage.getItem("uid") ?? 1,
              lat: this.lat,
              lng: this.lng,
          });
        }
        localStorage.setItem('lat', this.lat);
        localStorage.setItem('lng', this.lng);
        this.$router.push('/weather');
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
  