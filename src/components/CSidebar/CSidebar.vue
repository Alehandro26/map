<template>
  <aside class="sidebar">
    <CCard
      v-for="item in list"
      :key="item.id"
      :address="item.address"
      :title="item.name"
      :selected="props.startList"
      class="sidebar__card"
    />
  </aside>
</template>

<script setup>
import { computed } from "vue";
import CCard from "../CCard/CCard.vue";

const props = defineProps({
  points: {
    type: Array,
    default: () => [],
  },
  startList: {
    type: Number,
    default: null,
  },
});

const list = computed(() => {
  if (props.startList) {
    return props.points.slice(props.startList);
  }
  return props.points;
});
</script>

<style lang="less">
.sidebar {
  max-height: 100vh;
  overflow: scroll;
  &__card {
  }
}
</style>
