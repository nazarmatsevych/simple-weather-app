<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import VueGoogleAutocomplete  from "vue-google-autocomplete"
import Loader from "../components/Loader.vue";
import WeatherCard from "../components/WeatherCard.vue";
import TemperatureChart from "../components/TemperatureChart.vue";

import { getUserCity } from "../services/getUserCity";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

let city = ref('')
const temperature = ref(null)
const weather = ref(null)
const currentCity = ref(null)
const isError = ref(false);
const isLoading = ref(false)
let hourlyWeatherData = ref([]);

const autocompleteOptions = {
  types: ['(cities)'],
  componentRestrictions: { country: 'us' },
}

const getUserCityByIp = async () => {
  city.value = await getUserCity();
}

const fetchWeatherData = async () => {
  try {
    isLoading.value = true;
    isError.value = false;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${weatherApiKey}&units=metric`
    )
    hourlyWeatherData.value = response.data;
    temperature.value = Math.round(response.data.main.temp).toString()
    weather.value = response.data.weather[0].description
    currentCity.value = city.value
  } catch {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

const onPlaceChanged = async (place) => {
  city.value = place.locality || city.value
  await fetchWeatherData();
}

onMounted( async () => {
  await getUserCityByIp();
  
  if (JSON.parse(localStorage.getItem('favCity'))) {
    city.value = JSON.parse(localStorage.getItem('favCity'))
    localStorage.removeItem('favCity')
  }
  
  if (city.value.length) {
    await fetchWeatherData()
  }
})
</script>

<template>
  <vue-google-autocomplete
    :options="autocompleteOptions"
    types="(cities)"
    id="map"
    v-model="city"
    class="form-control search-input"
    :class="{'isError': isError}"
    placeholder="Start typing..."
    @placechanged="onPlaceChanged"
  >
  </vue-google-autocomplete>
  <p v-if="isError" class="error-message">Weather is not available in this area</p>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div v-else-if="!currentCity">
    <p class="warning-message">Enter a city to see weather information</p>
  </div>
  <div v-else>
    <WeatherCard
      :temperature="temperature"
      :city-name="currentCity"
      :weather="weather"
    />
    <TemperatureChart :weather-data="hourlyWeatherData" />
  </div>
</template>

<style lang="scss" scoped>
.search-input {
  width: 75%;
  margin: 0 auto;
  display: block;
  padding: 15px;
  
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0 16px 0 16px;
  transition: 0.4s;
}

.error-message {
  color: red;
  text-align: center;
}

.warning-message {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
</style>
