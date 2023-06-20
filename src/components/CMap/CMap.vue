<template>
  <div class="map">
    <yandex-map
      class="map__content"
      :settings="settings"
      :coordinates="[45.018391, 41.937909]"
      zoom="14"
      :controls="['trafficControl', 'geolocationControl', 'typeSelector']"
      map-type="map"
    >
      <yandex-marker
        v-for="(point, index) in props.points"
        :key="point.id"
        :marker-id="point.id"
        :coordinates="[point.coordinates.latitude, point.coordinates.longitude]"
        :properties="{
          hintContent: point.name,
        }"
        :options="{
          iconLayout: 'default#imageWithContent',
          iconImageHref:
            'https://imgbb.su/images/2023/06/07/point75fa4ab876d4ee86.png',
          iconImageOffset: [-16, -50],
          iconImageSize: [32, 45],
        }"
        :events="['balloonclose', 'balloonopen']"
        @balloonclose="balloonToggle(null)"
        @balloonopen="balloonToggle(index)"
      >
        <template #component>
          <CCard :data="point" :balloon="true" />
        </template>
      </yandex-marker>
    </yandex-map>
  </div>
</template>

<script setup>
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import CCard from "../CCard/CCard.vue";

const settings = {
  apiKey: "",
  lang: "ru_RU",
  coordorder: "latlong",
  enterprise: false,
  version: "2.1",
};

const props = defineProps({
  points: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["selectedPoint"]);

function balloonToggle(num) {
  emits("selectedPoint", num);
}

// const greenIcon =
//   "https://imgbb.su/images/2023/06/07/point-green78ddbddc17d786dc.png";
// const markerIcon = ref({
//   layout: "default#imageWithContent",
//   imageHref: "https://imgbb.su/images/2023/06/07/point75fa4ab876d4ee86.png",
//   imageSize: [32, 45],
//   imageOffset: [-16, -50],
// });
</script>

<style lang="less">
.map {
  &__content {
    height: 100vh;
  }
}

.yandex-balloon {
  width: 214px;
  height: 148px;
}

[class$="balloon__content"] {
  padding: 0 !important;
  margin: 0 !important;
}

[class$="balloon__tail"] {
  display: none !important;
}
</style>
