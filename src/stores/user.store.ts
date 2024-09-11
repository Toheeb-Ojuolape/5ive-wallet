import { User } from "@/interfaces/user";
import authService from "@/services/authService";
import { defineStore } from "pinia";


export const useUserStore = defineStore("userStore", {
    state: ()=>({
        user: JSON.parse(localStorage.getItem("user")) as User
    }),
    actions:{
        setUser(data){
            authService.setUser(data)
            this.user = {...this.user, ...data}
        }
    }
})