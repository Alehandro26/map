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
import { ref, watch } from "vue";

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
  selected: {
    type: Number,
    default: null,
  },
});

const emits = defineEmits(["update:selected"]);

const coordinates = ref([45.018391, 41.937909]);
const dataPopup = ref(null);
const markers = ref(null);
const map = ref(null);
const prevPoint = ref(null);


function balloonToggle(point, num) {
  if (point) {
    //Задает высоту balloon
    const balloonDocument = document.querySelector(".yandex-balloon");
    const balloonHeight = document.querySelector(".map__balloon").clientHeight;
    balloonDocument.style.height = balloonHeight + "px";

    //центрирование карты по выбранной точке
    const { latitude, longitude } = point.coordinates;
    coordinates.value = [latitude, longitude];
  }

  if (num === null) {
    changeIcon(prevPoint.value)
  } else {
    if (prevPoint.value) {
      changeIcon(prevPoint.value);
    }
    changeIcon(num, true);
    prevPoint.value = num;
  }

  emits("update:selected", num);
}
//Меняет иконку выбранной точки
function changeIcon(value, selected = false) {
  let icon = selected ? "https://imgbb.su/images/2023/06/07/point-green78ddbddc17d786dc.png" : "https://imgbb.su/images/2023/06/07/point75fa4ab876d4ee86.png";

  markers.value[value].options._options.iconImageHref = icon;
  markers.value[value].balloon._showIcon();
}

watch(() => dataPopup.value, (v) => {
  if (v !== null) return;
  markers.value[prevPoint.value].balloon.close();
})
//НЕОБХОДИМО доработать работы открытия балуна при клике на сайдбар
watch(() => props.selected, (v,ov) => {
  if (v === ov || v === null) return;
  const { latitude, longitude } = props.points[v].coordinates;
  coordinates.value = [latitude, longitude];
})
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
}

[class*="balloon_layout_normal"] {
  box-shadow: none !important;
  top: 0 !important;
}

[class$="balloon__content"] {
  padding: 0 !important;
  margin: 0 !important;
}

[class$="balloon__tail"] {
  display: none !important;
}

[class$="balloon__layout"],
[class$="balloon__content"] > ymaps {
  height: auto !important;
  border-radius: 10px;
}
</style>
