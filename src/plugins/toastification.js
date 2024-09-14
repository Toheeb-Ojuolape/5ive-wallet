import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default function setupToastification (app) {
  const options = {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
  }

  app.use(Toast, options)
}
