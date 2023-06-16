<template>
  <div class="card" :class="{ card_selected: selectedPoint }">
    <h3 class="card__title">{{ props.title }}</h3>
    <span class="card__address">{{ props.address }}</span>
    <button class="card__button">Самовывоз</button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  selected: {
    type: Number,
    default: null,
  },
});

const selectedPoint = computed(() => {
  return props.index === props.selected;
});
</script>

<style lang="less">
.card {
  padding: 18px 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-bottom: 1px solid #e3e3e3;

  &__title {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }

  &__address {
    margin: 8px 0;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    color: #a5a5a5;
  }

  &__button {
    padding: 5px 0 6px;
    width: 68px;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #ffffff;
    background: #005bff;
    border-radius: 4px;
  }

  &_selected {
    background: #005bff;

    .card__title {
      color: #ffffff;
    }

    .card__address {
      color: rgba(255, 255, 255, 0.6);
    }

    .card__button {
      background: #ffffff;
      color: #000000;
    }
  }
}
</style>
