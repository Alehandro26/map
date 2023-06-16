<template>
  <div class="page-main">
    <CMap :points="dataPoints" @selected-point="selected = $event" />
    <CSidebar
      :points="dataPoints"
      :selected="selected"
      class="page-main__sidebar"
    />
  </div>
</template>

<script setup>
import CMap from "../../components/CMap/CMap.vue";
import CSidebar from "../../components/CSidebar/CSidebar.vue";
import db from "../../../db.json";
import { onMounted, ref } from "vue";

const dataPoints = ref(null);
const selected = ref(null);

onMounted(getData);

function getData() {
  const { points } = db;
  if (points) {
    dataPoints.value = points;
  }
}
</script>

<style lang="less">
.page-main {
  position: relative;

  &__sidebar {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
