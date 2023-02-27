<template>
  <div class="warning-modal" @blur="$emit('close')">
    <div class="warning-modal__content">
      <p class="warning-modal__title">
        Maximum number of favorites cities exceeded. If you want to add new one, you need to delete previous city
      </p>
      <button class="warning-modal__button" @click="$emit('close')">x</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.warning-modal {
  z-index: 10;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 600px;
  min-width: 500px;
  padding: 30px 20px;
  background-color: #F9F9F8;
  margin: 50px auto 0;
  border: 3px solid orange;
  border-radius: 12px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  
  &__content {
    position: relative;
  }
  
  &__title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  
  &__button {
    border: 1px solid transparent;
    font-size: 18px;
    position: absolute;
    top: -20px;
    right: 5px;
    cursor: pointer;
    transition: scale 150ms;
    
    &:hover {
      scale: 1.2;
    }
  }
}
</style>
