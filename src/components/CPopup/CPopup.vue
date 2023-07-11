<template>
  <div v-if="props.modelValue" ref="popup" class="popup">
    <div class="popup__wrapper">
      <div class="popup__close" @click="closePopup" />
      <h3 class="popup__title">{{ props.modelValue.name }}</h3>
      <div class="popup__address">{{ props.modelValue.address }}</div>
      <!--eslint-disable-next-line vue/no-v-html-->
      <p v-if="boldText" class="popup__description" v-html="boldText" />
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
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(["update:modelValue"]);

const popup = ref(null);

const boldText = computed(() => {
  if (props.modelValue.description) {
    return props.modelValue.description.replace(
      /До встречи на Ozon!/,
      "<b>До встречи на Ozon!</b>"
    );
  }
  return null;
});

onClickOutside(popup, closePopup);

function closePopup() {
  emits("update:modelValue", null);
}
</script>

<style lang="less">
.popup {
  position: relative;
  overflow-y: scroll;
  width: 872px;
  max-width: calc(100% - 20px);
  max-height: 540px;
  padding: 50px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.15);

  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 24px;
    height: 24px;
    cursor: pointer;

    &::after,
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 2px;
      background: #000;
      border-radius: 5px;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  &__title {
    margin-bottom: 15px;
    color: #000;
    font-size: 24px;
    font-weight: 700;
    line-height: 130%;
  }

  &__address {
    padding-left: 29px;
    color: #000;
    font-size: 16px;
    font-family: Inter;
    line-height: 130%;
    background-image: url(https://i.postimg.cc/8cWL1HfB/point.png);
    background-size: 15px 21px;
    background-repeat: no-repeat;
    background-position-x: 4px;
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

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
