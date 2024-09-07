import { useToast } from 'vue-toastification'

export const handleErrors = (message: string) => {
  const toast = useToast()
  toast.error(message)
}
