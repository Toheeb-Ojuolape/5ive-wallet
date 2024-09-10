import { useToast } from 'vue-toastification'

export const handleErrors = (error: Error | any) => {
  const toast = useToast()
  toast.error(error.message)
}



export const handleSuccess = (message: string) => {
  const toast = useToast()
  toast.success(message)
}
