import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import { createMetaManager } from 'vue-meta'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import '@/assets/styles/main.sass'

import Loader from '@/components/Loader'

const app = createApp(App)

installElementPlus(app)

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "sweethome58-2f53f.firebaseapp.com",
  projectId: "sweethome58-2f53f",
  storageBucket: "sweethome58-2f53f.appspot.com",
  messagingSenderId: "905056522402",
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: "G-H5F5WWKFED"
})

app
  .use(store)
  .use(router)
  .use(createMetaManager())
  .mount('#app')

app.component('Loader', Loader)