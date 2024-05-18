import './index.css';
import { Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import Notifications from '@kyvg/vue3-notification'

import { createApp } from 'vue';

import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

myApp.use(Notifications)


// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')