<template>
  <div v-if="props.modelValue" class="popup">
    <h3 class="popup__title">{{ props.modelValue.name }}</h3>
    <div class="popup__address">{{ props.modelValue.address }}</div>
    <p class="popup__description" v-html="props.modelValue.description" />
    <div v-if="props.modelValue.images.length" class="popup__images">
      <img
        v-for="(image, index) in props.modelValue.images"
        :key="index"
        :src="image.url"
        alt=""
        class="popup__image"
      />
    </div>
  </div>
</template>

<script setup>
// import vClickOutside from "v-click-outside";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});
// const emits = defineEmits(["update:modelValue"]);

// function closePopup() {
//   console.log(1);
//   emits("update:modelValue", null);
// }
</script>

<style lang="less">
.popup {
  padding: 50px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.15);

  &__title {
    margin-bottom: 15px;
    color: #000;
    font-size: 24px;
    font-weight: 700;
    line-height: 130%;
  }

  &__address {
    color: #000;
    font-size: 16px;
    font-family: Inter;
    line-height: 130%;
  }

  &__description {
    margin: 25px 0;
    color: #000;
    font-size: 15px;
    font-family: Inter;
    line-height: 140%;
  }

  &__images {
    display: flex;
    overflow-x: scroll;
  }

  &__image {
    height: 171px;
  }
}
</style>
