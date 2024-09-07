/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import setupToastification from './plugins/toastification'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
setupToastification(app)

registerPlugins(app)

app.mount('#app')
