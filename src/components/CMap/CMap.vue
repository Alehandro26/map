<template>
  <div class="map">
    <yandex-map
      ref="map"
      class="map__content"
      :settings="settings"
      :coordinates="coordinates"
      zoom="14"
      :controls="['trafficControl', 'geolocationControl', 'typeSelector']"
      map-type="map"
    >
      <yandex-clusterer :options="{ preset: 'islands#nightCircleIcon' }">
        <yandex-marker
          v-for="(point, index) in props.points"
          :key="point.id"
          ref="markers"
          :marker-id="point.id"
          :coordinates="[
            point.coordinates.latitude,
            point.coordinates.longitude,
          ]"
          :properties="{
            hintContent: point.name,
          }"
          :options="{
            iconLayout: 'default#imageWithContent',
            iconImageHref:
              'https://imgbb.su/images/2023/06/07/point75fa4ab876d4ee86.png',
            iconImageOffset: [-16, -50],
            iconImageSize: [32, 45],
            hideIconOnBalloonOpen: false,
          }"
          :events="['balloonclose', 'balloonopen']"
          @balloonclose="balloonToggle(null, null)"
          @balloonopen="balloonToggle(point, index)"
        >
          <template #component>
            <CCard
              ref="balloon"
              class="map__balloon"
              :data="point"
              :balloon="true"
              @open-popup="dataPopup = $event"
            />
          </template>
        </yandex-marker>
      </yandex-clusterer>
    </yandex-map>
    <Teleport to="body">
      <CPopup v-model="dataPopup" class="map__popup" />
    </Teleport>
  </div>
</template>

<script setup>
import { YandexMap, YandexClusterer, YandexMarker } from "vue-yandex-maps";
import CCard from "../CCard/CCard.vue";
import CPopup from "../CPopup/CPopup.vue";
import { ref } from "vue";

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

const coordinates = ref([45.018391, 41.937909]);
const dataPopup = ref(null);
const markers = ref(null);
const map = ref(null);
const balloon = ref(null);

function balloonToggle(point, num) {
  if (point) {
    const balloonDocument = document.querySelector(".yandex-balloon");
    const balloonHeight = document.querySelector(".map__balloon").clientHeight;
    balloonDocument.style.height = balloonHeight + "px";

    const { latitude, longitude } = point.coordinates;
    coordinates.value = [latitude, longitude];
  }


  if (num === null) {
    for (let i = 0; i < markers.value.length; i++) {
      markers.value[i].options._options.iconImageHref =
        "https://imgbb.su/images/2023/06/07/point75fa4ab876d4ee86.png";
    }
  } else {
    markers.value[num].options._options.iconImageHref =
      "https://imgbb.su/images/2023/06/07/point-green78ddbddc17d786dc.png";
  }

  emits("selectedPoint", num);
}
</script>

<style lang="less">
.map {
  position: relative;

  &__content {
    height: 100vh;
  }

  &__popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
