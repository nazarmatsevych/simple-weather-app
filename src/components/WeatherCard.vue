<script setup>
import { ref } from 'vue'
import WarningModal from "./WarningModal.vue";
const props = defineProps({
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


const isModalVisible = ref(false);
const favoritesList = ref(JSON.parse(localStorage.getItem('favCities')) || []);
const isFavorite = ref(false);


const addToFavorites = () => {
  if (favoritesList.value.indexOf(props.cityName) === -1 && favoritesList.value.length < 5) {
    favoritesList.value.push(props.cityName)
    localStorage.setItem('favCities', JSON.stringify(favoritesList.value));
  }
  
  if (favoritesList.value.length === 5) {
    isModalVisible.value = true;
  }
  
  if (favoritesList.value.includes(props.cityName)) {
    isFavorite.value = true;
  }
}

const currentDateTime = ref(new Date().toLocaleDateString())
</script>

<template>
  <WarningModal @close="isModalVisible = false" v-if="isModalVisible && !isFavorite" />
  <div class="card" :class="{'card-blur': isModalVisible && !isFavorite}">
    <p class="card__date">{{ currentDateTime  }}</p>
    <img class="card__logo" src="../assets/weather.png" alt="weather logo">
    <button
      :class="{'card__button--active': isFavorite}"
      class="card__button"
      @click="addToFavorites"
    >
      Add to FAV
    </button>
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
.card-blur {
  filter: blur(3px);
}
.card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 450px;
  min-width: 290px;
  padding: 25px;
  background-color: #F9F9F8;
  margin: 50px auto 0;
  border: 1px solid lightseagreen;
  border-radius: 12px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  
  &__date {
    position: absolute;
    top: 0;
    font-size: 18px;
  
    @media (max-width: 640px) {
      font-size: 16px;
    }
  }
  
  &__logo {
    position: absolute;
    width: 60px;
    right: 20px;
    top: 20px;
  
    @media (max-width: 640px) {
      width: 40px;
      right: 15px;
    }
  }
  
  &__button {
    position: absolute;
    top: 25%;
    border: 2px solid tomato;
    border-radius: 8px;
    padding: 5px;
    cursor: pointer;
    transition: color 300ms;
    
    &:hover,
    &--active {
      border: 2px solid firebrick;
      background-color: red;
      color: #fff;
    }
    
    &--active {
      cursor: not-allowed;
    }
  }
  
  &__temp {
    align-self: flex-start;
    font-size: 18px;
    font-weight: 700;
    border: 2px solid orange;
    padding: 5px 20px;
    background: lightgoldenrodyellow;
    border-radius: 12px;
  
    @media (max-width: 640px) {
      font-size: 14px;
      padding: 5px 15px;
    }
  }
  
  &__city {
    font-size: 36px;
    font-weight: 700;
    padding: 0 15px;
    text-transform: uppercase;
    text-decoration: underline;
  
    @media (max-width: 640px) {
      font-size: 24px;
    }
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
  
    @media (max-width: 640px) {
      padding: 5px 15px;
      font-size: 14px;
    }
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
