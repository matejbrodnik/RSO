<template>
    <Navigation/>
    <v-card style="width: 500px; margin-left: 65%;">
        <v-card-title>List of locations</v-card-title>
        <v-data-table
        density="compact"
        :headers="headers"
        :items="locations"
        >
        </v-data-table>
    </v-card>
</template>
  

<script>
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import Navigation from './Navigation.vue';

export default defineComponent({
  setup() {
    const headers = ref([
      {
        key: 'lat',
        title: 'Latitude',
      },
      {
        key: 'lng',
        title: 'Longitude',
      },
    ]);
    const locations = ref([{lat: 10, lng: 20}, {lat: 10, lng: 20}])
    // const weather = ref<any[]>([])
    onMounted(() => {
        getList();
    });

    async function getList() {
        try {
          const response = await axios.post('/api/locationlist', {
            uid: localStorage.getItem("uid") ?? 1,
          });
          console.log(response);
          locations.value = response.data.data;
        } catch (error) {
          if (error.response) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
    }

    return {
      headers,
      locations,
    };
  },
  components: {
      Navigation,
  },
  // props: {
  //   lat: {
  //     type: Number,
  //     required: false,
  //   },
  //   lng: {
  //     type: Number,
  //     required: false,
  //   },
  // },
});

</script> 

  <style scoped>
  .error {
    color: red;
  }
  </style>
      