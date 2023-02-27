<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <router-link to="/" class="nav__item" active-class="nav__item--active">
          Home
        </router-link>
      </li>
      <li>
        <router-link to="/favorites" class="nav__item" active-class="nav__item--active">
          Favorites
        </router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<style scoped lang="scss">
.nav {
  width: max-content;
  background-color: #fff;
  padding: 0 15px;
  margin-bottom: 24px;
  border: 1px solid gray;
  border-radius: 8px;
  color: gray;
  font-weight: 800;
  &__list {
    display: flex;
    gap: 15px;
    list-style: none;
    padding: 0;
  }
  
  &__item {
    color: black;
    text-decoration: none;
    padding: 0 10px;
    border: 1px solid transparent;
  
    &--active {
      border: 1px solid gainsboro;
      border-radius: 8px;
      background-color: lightblue;
      padding: 5px 10px;
      color: darkblue;
    }
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
