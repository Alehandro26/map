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
import { getData } from "../../api/index";
import { onMounted, ref } from "vue";

const dataPoints = ref(null);
const selected = ref(null);

onMounted(() => {
  getData(dataPoints);
});
</script>

<style lang="less">
@import '../../styles/vars.less';

.page-main {
  position: relative;

  &__sidebar {
    display: none;
    position: absolute;
    top: 0;
    left: 0;

    @media @desktop-only {
      display: block;
    }
  }
}
</style>
