import { useToast } from "vue-toastification";

export const handleErrors = (error) => {
  const toast = useToast();
  toast.error(error.message || "Something went wrong!");
};

export const handleSuccess = (message) => {
  const toast = useToast();
  toast.success(message);
};
