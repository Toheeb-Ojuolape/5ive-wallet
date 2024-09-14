import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { options } from './plugins/toastification'
const pinia = createPinia()

loadFonts()

createApp(App).use(router)
  .use(vuetify)
  .use(Toast, options)
  .use(pinia)
  .mount('#app')
