<script setup>
import { ref, onMounted, defineProps, toRefs } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Loader from "./Loader.vue";

const props = defineProps({
  weatherData: {
    type: Object,
    required: true,
  }
});

const chartCanvas = ref(null);
const { weatherData } = toRefs(props)
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
const isLoading = ref(false)
const isError = ref(false)

const getHourlyWeatherData = async () => {
  try {
    isLoading.value = true;
    isError.value = false;
    const { lat, lon } = weatherData.value.coord;
    const hourlyResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: {
          lat,
          lon,
          exclude: 'minutely,daily',
          appid: weatherApiKey,
          units: 'metric',
        },
      }
    );
    return hourlyResponse.data.hourly;
  } catch (error) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const drawChart = async () => {
  try {
    isError.value = false;
    isLoading.value = true;
    const hourlyWeatherData = await getHourlyWeatherData();
    
    const chartData = {
      labels: hourlyWeatherData.map((data) => {
        const date = new Date(data.dt * 1000);
        const hour = date.getHours();
        return `${hour}:00`;
      }),
      datasets: [
        {
          label: 'Temperature',
          data: hourlyWeatherData.map((data) => data.temp),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    
    new Chart(chartCanvas.value, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            suggestedMin: Math.min(...chartData.datasets[0].data) - 1,
            suggestedMax: Math.max(...chartData.datasets[0].data) + 1,
          },
        },
      },
    })
  } catch {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (weatherData.value.coord !== undefined) {
    drawChart();
  }
});
</script>

<template>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div v-show="!isLoading && !isError" class="chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
  <p class="error-message" v-if="isError">Chart is not available for this city</p>
</template>

<style>
.chart {
  width: 600px;
  height: 300px;
  margin: 24px auto 0;
  border-radius: 12px;
  background-color: #F9F9F8;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
