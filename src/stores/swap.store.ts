import { Currency } from "@/interfaces/currency"
import { defineStore } from "pinia"
import router from "@/router";

export const useSwapStore = defineStore("swapStore", {
    state: ()=>({
        selectcurrency: false,
        currency: {} as Currency
    }),

    actions: {
        setShowSelectCurrency(){
            this.selectcurrency = !this.selectcurrency
        },
        setCurrency(currency){
            this.currency = currency
            router.push('/swap')
        }
    }

})