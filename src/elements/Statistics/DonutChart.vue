<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "DonutChart",
  components: {
    Doughnut,
  },
  props: {
    balances: {
      type: Array,
      required: true,  
    },
    currencies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.currencies,
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16", "#F39C12"], 
            data: this.balances,  
          },
        ],
      };
    },
  },
};
</script>

