
import { registerPlugins } from '@/plugins'
import setupToastification from './plugins/toastification'
import App from './App.vue'

import { createApp } from 'vue'

const app = createApp(App)
setupToastification(app)

registerPlugins(app)

app.mount('#app')
