<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const favoriteCities = ref(JSON.parse(localStorage.getItem('favCities')) || []);

const showFavCityWeather = (city) => {
  localStorage.setItem('favCity', JSON.stringify(city))
  router.push('/');
}

const remove = (index) => {
  favoriteCities.value.splice(index, 1);
  localStorage.setItem('favCities', JSON.stringify(favoriteCities.value))
}
</script>

<template>
  <div class="container">
    <div class="favCard" v-if="favoriteCities.length" v-for="(city, i) of favoriteCities">
      <div class="favCard__content">
        <p class="favCard__number">{{ i + 1}}</p>
        <p @click="showFavCityWeather(favoriteCities[i])" class="favCard__city">{{ city }}</p>
        <button class="favCard__button" @click="remove(i)">Remove</button>
      </div>
    </div>
    <div v-else>
      <p>No favorite cities yet</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
  justify-content: center;
}
.favCard {
  &__content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 100px;
    min-width: 100px;
    padding: 25px;
    background-color: #F9F9F8;
    margin: 50px auto 0;
    border: 1px solid lightseagreen;
    border-radius: 12px;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }
  
  &__number {
    top: 0;
    right: 20px;
    position: absolute;
    font-size: 18px;
  }
  
  &__city {
    font-size: 36px;
    font-weight: 700;
    
    &:hover {
      color: #313131;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  
  &__button {
    padding: 10px;
    font-size: 18px;
    font-weight: 600;
    border: 1px solid lightseagreen;
    border-radius: 8px;
    background-color: lightblue;
    cursor: pointer;
    
    &:hover {
      color: darkslategrey;
    }
  }
}
</style>
