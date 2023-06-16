<template>
  <aside ref="sidebar" class="sidebar">
    <CCard
      v-for="(item, index) in props.points"
      :key="index"
      :index="index"
      :address="item.address"
      :title="item.name"
      :selected="props.selected"
      class="sidebar__card"
    />
  </aside>
</template>

<script setup>
import { nextTick, onMounted, watch } from "vue";
import CCard from "../CCard/CCard.vue";
import animateScrollTo from "animated-scroll-to";

const props = defineProps({
  points: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: Number,
    default: null,
  },
});

//Массив карточек боковой панели
let cardEls;

onMounted(() => {
  nextTick(() => {
    cardEls = document.querySelectorAll(".sidebar__card");
  });
});

watch(
  () => props.selected,
  (v, ov) => {
    if (v === ov) return;
    if (v === null) {
      goToPoint(0);
      return;
    }
    goToPoint(v);
  }
);

function goToPoint(index) {
  const scrollTo = cardEls[index];
  const mid = -(window.innerHeight / 2 - scrollTo.clientHeight / 2);

  animateScrollTo(scrollTo, {
    elementToScroll: document.querySelector(".sidebar"),
    cancelOnUserAction: false,
    speed: 1000,
    minDuration: 300,
    maxDuration: 300,
    verticalOffset: mid,
  });
}
</script>

<style lang="less">
.sidebar {
  height: 100vh;
  overflow-y: auto;
}
</style>
