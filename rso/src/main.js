import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import cors from "cors";


const vuetify = createVuetify({
    components,
    directives,
  });

const app = createApp(App).use(cors).use(router).use(vuetify).mount('#app')
