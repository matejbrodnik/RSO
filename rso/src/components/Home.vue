<!-- <template>
    <div id="map" style="height: 400px; width: 100%;"></div>
</template>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPiprMeKFTJrJ5_yBBLVOFjWy-iF86U2M&callback=initMap" async defer></script>

<script>
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  const marker = new google.maps.Marker({
    position: { lat: -34.397, lng: 150.644 },
    map: map,
    title: 'Hello World!',
  });
}
</script> -->


<template>
  <div>
    <div id="map" style="height: 400px; width: 600px;"></div>
    <v-btn class="bg-deep-purple"
    theme="dark"
    @click="setLocation"
    style="margin-top: 5px;">Izberi lokacijo</v-btn>
  </div>

  </template>
  
  <script>
  import axios from 'axios';

  export default {
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
            console.log("Coordinates clicked:", lat, lng);
            
            if (marker) {
                marker.setMap(null);
            }
            marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: `Selected location: ${lat}, ${lng}`,
            });
        })
      },
      async setLocation() {
        const response = await axios.post('http://localhost:4000/location', {
            lat: this.lat,
            lng: this.lng,
          });
      }
    },
  };
  </script>
  
  <style>
  /* Optional styling for the map container */
  #map {
    border: 1px solid #ddd;
  }
  </style>
  