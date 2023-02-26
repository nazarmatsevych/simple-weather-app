<script setup>
import { ref } from 'vue'
defineProps({
  temperature: {
    type: String,
  },
  cityName: {
    type: String,
  },
  weather: {
    type: String,
  },
})

const currentDateTime = ref(new Date().toLocaleDateString())
</script>

<template>
  <div class="card">
    <p class="card__date">{{ currentDateTime  }}</p>
    <img class="card__logo" src="../assets/weather.png" alt="weather logo">
    <div class="card__temp">
      <p>{{ temperature }}°C</p>
    </div>
    <div class="card__city">
      <p>{{ cityName }}</p>
    </div>
    <div class="card__weather">
      <p>{{ weather }}</p>
    </div>
    <p class="card__footer">Weather app</p>
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 450px;
  padding: 25px;
  background-color: #F9F9F8;
  margin: 200px auto 0;
  border: 1px solid lightseagreen;
  border-radius: 12px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  
  &__date {
    position: absolute;
    top: 0;
    font-size: 18px;
  }
  
  &__logo {
    position: absolute;
    width: 60px;
    right: 20px;
    top: 20px;
  }
  
  &__temp {
    align-self: flex-start;
    font-size: 18px;
    font-weight: 700;
    border: 2px solid orange;
    padding: 5px 20px;
    background: lightgoldenrodyellow;
    border-radius: 12px;
  }
  
  &__city {
    font-size: 36px;
    font-weight: 700;
    padding: 0 15px;
    text-transform: uppercase;
    text-decoration: underline;
  }
  
  &__weather {
    align-self: flex-end;
    font-size: 18px;
    font-weight: 700;
    border: 2px solid orange;
    padding: 5px 20px;
    background: lightgoldenrodyellow;
    border-radius: 12px;
    text-transform: capitalize;
  }
  
  &__footer {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 16px;
    font-weight: 600;
  }
}

</style>
