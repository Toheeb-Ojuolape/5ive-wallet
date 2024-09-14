<template>
    <div>
        <span :class="`fi fi-${getCountryValue(payin)}`"></span>
        {{ payin }}
        <v-icon size="small" :icon="'mdi-arrow-right'"/>
        <span :class="`fi fi-${getCountryValue(payout)}`"></span>
        {{ payout }}
    </div>
</template>



<script>
import { getCountry } from '@/utils/formatter'
export default {
    props:{
        payin:{
            type: String
        },
        payout:{
            type: String
        }
    },
    methods:{
        getCountryValue(country){
            return getCountry(country)
        }
    }
}
</script>