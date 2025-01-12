<template>
  <Navigation/>
    <v-card style="width: 600px; margin-left: 65%;">
        <v-card-title>Weather</v-card-title>
        <v-data-table
        density="compact"
        :headers="headers"
        :items="weather"
        :search="search"
        >
        </v-data-table>
    </v-card>
</template>


<script>
// import { onMounted, ref } from 'vue';
// import { fetchWeatherApi } from 'openmeteo';
// import axios from 'axios';

// const search = ref('');
// const params = {
//     "latitude": 52.52,
//     "longitude": 13.41,
//     "daily": ["weather_code", "precipitation_probability_max"]
// };
// const url = "https://api.open-meteo.com/v1/forecast";
// const headers = ref([
//     // {
//     // align: 'start',
//     // key: 'date',
//     // sortable: false,
//     // title: 'Date',
//     // },
//     {
//     key: 'weather',
//     title: 'Weather',
//     },
//     {
//     key: 'rain',
//     title: 'Precipitation (%)',
//     },
// ]);
// const weather = ref<any[]>([[10, 20], [20, 30]])
// // const weather = ref<any[]>([])

// onMounted(() => {
//     getWeather();
// });

// async function getWeather() {
//     const responses = await fetchWeatherApi(url, params);
//     const response = responses[0];
//     const daily = response.daily();
//     // console.log(daily);
//     const response1 = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,precipitation_probability_max');
//     // console.log(response1);
//     const weatherData = [
//         daily!.variables(0)!.valuesArray()!,
//         daily!.variables(1)!.valuesArray()!,
//     ];
//     //weather.value = weatherData;
//     console.log(weather);

// }

import { defineComponent, ref, onMounted } from 'vue';
import { fetchWeatherApi } from 'openmeteo';
import axios from 'axios';
import Navigation from './Navigation.vue';

export default defineComponent({
  setup() {
    const search = ref('');
    const params = {
        "latitude": 51.1,
        "longitude": 31.2,
        "daily": ["weather_code", "precipitation_hours", "precipitation_probability_max"]
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    // const responses = await fetchWeatherApi(url, params);
    
    const weatherCodeMap = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snowfall",
      73: "Moderate snowfall",
      75: "Heavy snowfall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

    const headers = ref([
      {
        align: 'start',
        key: 'date',
        sortable: false,
        title: 'Date',
      },
      {
        key: 'mintemp',
        title: 'Min. Temp. [°C]',
      },
      {
        key: 'maxtemp',
        title: 'Max. Temp. [°C]',
      },
      {
        key: 'weather',
        title: 'Weather',
      },
      {
        key: 'rain',
        title: 'Precipitation (%)',
      },
    ]);
    const weather = ref([{weather: 10, rain: 20}, {weather: 10, rain: 20}])
    // const weather = ref<any[]>([])
    onMounted(() => {
      getWeather();
    });

    async function getWeather() {
        const lat = localStorage.getItem('lat');
        const lng = localStorage.getItem('lng');
        console.log(lat);
        console.log("---");
        console.log(lng);
        //const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
        const response = await axios.post('/api/weather', {
            lat: lat,
            lng: lng,
        });
        const daily = response.data.data.daily;
        const weatherData = daily.time.map((date, i) => ({
            date,
            mintemp: daily.temperature_2m_min[i],
            maxtemp: daily.temperature_2m_max[i],
            weather: weatherCodeMap[daily.weather_code[i]],
            rain: daily.precipitation_probability_max[i],
        }));
        weather.value = weatherData;
        console.log(weatherData);
    }

    return {
      search,
      headers,
      weather,
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
  