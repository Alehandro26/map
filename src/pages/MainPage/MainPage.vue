<template>
  <div class="page-main">
    <CMap :points="dataPoints" @selected-point="listWith = $event" />
    <CSidebar
      :points="dataPoints"
      :start-list="listWith"
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
const listWith = ref(null);

onMounted(getData);

function getData() {
  const { points } = db;
  dataPoints.value = points;
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
