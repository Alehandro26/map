<template>
  <div
    class="card"
    :class="{ card_selected: selectedPoint, card_balloon: props.balloon }"
  >
    <h3 class="card__title">{{ props.data.name }}</h3>
    <span class="card__address">{{ props.data.address }}</span>
    <button
      v-if="props.balloon"
      class="card__button"
      @click="openPopup(props.data)"
    >
      Подробнее
    </button>
    <button v-else class="card__button">Самовывоз</button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    default: () => {},
  },
  selected: {
    type: Number,
    default: null,
  },
  balloon: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["openPopup"]);

const selectedPoint = computed(() => {
  return props.index === props.selected;
});

function openPopup(data) {
    emits("openPopup", data);
}
</script>

<style lang="less">
.card {
  padding: 18px 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-bottom: 1px solid #e3e3e3;
  cursor: pointer;
  transition: background .2s ease;

  &:not(.card_selected):not(.card_balloon):hover {
    background: #edf6ff;
  }

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

  &_balloon {
    width: 214px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    cursor: default;

    .card__button {
      padding: 11px 0;
      width: 100%;
      font-weight: 500;
      font-size: 15px;
      line-height: 100%;
      cursor: pointer;
    }
  }
}
</style>
