<!-- FinanceIcon.vue -->
<template>
  <svg
    fill="none"
    height="20"
    viewBox="0 0 21 20"
    width="21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.8359 15V12.5V15Z" fill="#9CA3AF" />
    <path
      d="M10.8359 15V12.5"
      stroke="#9CA3AF"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    />
    <path
      d="M9.22766 2.35004L3.45266 6.97504C2.80266 7.4917 2.386 8.58337 2.52766 9.40004L3.636 16.0334C3.836 17.2167 4.96933 18.175 6.16933 18.175H15.5027C16.6943 18.175 17.836 17.2084 18.036 16.0334L19.1443 9.40004C19.2777 8.58337 18.861 7.4917 18.2193 6.97504L12.4443 2.35837C11.5527 1.6417 10.111 1.6417 9.22766 2.35004Z"
      stroke="#9CA3AF"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    />
  </svg>
</template>

<script lang="ts">
  export default {
    props: {
      color: {
        type: String,
        default: '#000',
      },
      className: {
        type: String,
        default: '',
      },
    },
  }
</script>
