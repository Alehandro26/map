<template>
  <div class="page-main">
    <CMap v-model:selected="selected" :points="dataPoints" />
    <CSidebar
      v-model:selected="selected"
      :points="dataPoints"
      class="page-main__sidebar"
    />
  </div>
</template>

<script setup>
import CMap from "../../components/CMap/CMap.vue";
import CSidebar from "../../components/CSidebar/CSidebar.vue";
import db from "../../../db.json";
import { onMounted, ref, watch } from "vue";

const dataPoints = ref(null);
const selected = ref(null);

onMounted(getData);

function getData() {
  const { points } = db;
  if (points) {
    dataPoints.value = points;
  }
}

watch(() => selected.value, (v) => {
  console.log(v);
})
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
