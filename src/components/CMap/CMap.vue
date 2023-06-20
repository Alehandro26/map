<template>
  <div class="map">
    <yandex-map
      class="map__content"
      :coords="[45.018391, 41.937909]"
      zoom="14"
      :controls="['trafficControl', 'geolocationControl', 'typeSelector']"
      map-type="map"
    >
      <ymap-marker
        v-for="(point, index) in props.points"
        :key="point.id"
        :marker-id="point.id"
        marker-type="placemark"
        :coords="[point.coordinates.latitude, point.coordinates.longitude]"
        :hint-content="point.name"
        :balloon-template="balloon(point.name, point.address)"
        :icon="markerIcon"
        cluster-name="1"
        @balloonclose="emits('selectedPoint', null)"
        @balloonopen="emits('selectedPoint', index)"
    /></yandex-map>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  points: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["selectedPoint"]);

// const greenIcon =
//   "https://imgbb.su/images/2023/06/07/point-green78ddbddc17d786dc.png";
const markerIcon = ref({
  layout: "default#imageWithContent",
  imageHref: "https://imgbb.su/images/2023/06/07/point75fa4ab876d4ee86.png",
  imageSize: [32, 45],
  imageOffset: [-16, -50],
});

const balloon = computed(() => {
  return (title, address) => {
    return `
        <div class="baloon">
          <h3 class="baloon__title">${title}</h3>
          <span>${address}</span>
          <button>Подробнее</button>
        </div>
        `;
  };
});
</script>

<style lang="less">
.map {
  &__content {
    height: 100vh;
  }
}

[class$="balloon__content"] {
  padding: 20px !important;
  margin: 0 !important;
}
</style>
