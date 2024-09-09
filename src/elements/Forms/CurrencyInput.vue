<template>
    <div class="relative">
        <input class="currency-input" type="number" inputmode="numeric"/>
        <CurrencySelector :name="'country'" @handleInput="handleInput"/>
    </div>
</template>


<script>
import CurrencySelector from '../Currencies/CurrencySelector.vue';

export default {
  components: { CurrencySelector },

  methods:{
    handleInput(country){
        console.log(country)
    }
  }
    
}
</script>


<style scoped>
.currency-input{
    padding: 20px 16px;
    width: 100%;
    border: 0px; 
    border-radius: 8px;
    background: white
}

.currency-input:focus{
    outline: 0;
    border: 0
}
</style>