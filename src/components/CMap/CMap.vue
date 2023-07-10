<template>
  <div class="map">
    <yandex-map
      class="map__content"
      :settings="settings"
      :coordinates="optionsMap.coordinates"
      :zoom="optionsMap.zoom"
      :controls="['trafficControl', 'geolocationControl', 'typeSelector']"
      map-type="map"
      :events="['actionend']"
      @actionend="newCenter"
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
              'https://i.postimg.cc/8cWL1HfB/point.png',
            iconImageOffset: [-16, -50],
            iconImageSize: [32, 45],
            hideIconOnBalloonOpen: false,
          }"
          :events="['balloonclose', 'balloonopen']"
          @balloonclose="balloonToggle(null)"
          @balloonopen="balloonToggle(index)"
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

const optionsMap = ref({
  coordinates: [45.018391, 41.937909],
  zoom: 14,
})
const dataPopup = ref(null);
const markers = ref(null);
const prevPoint = ref(null);
const changeCenter = ref(false);

//Вызова балуна, когда центр сменился
function newCenter() {
  changeCenter.value = true;

  setTimeout(() => {
    changeCenter.value = false;
  }, 0)
}
//Переключатель балуна
function balloonToggle(num) {
  if (num === null) {
    changeIcon(prevPoint.value);
  } else {
    if (prevPoint.value !== null) {
      changeIcon(prevPoint.value);
    }
    changeIcon(num, true);
    prevPoint.value = num;
  }

  emits("update:selected", num);
}
//Меняет иконку выбранной точки
function changeIcon(value, selected = false) {
  let icon = selected ? "https://i.postimg.cc/SsnWPqyP/point-green.png" : "https://i.postimg.cc/8cWL1HfB/point.png";

  markers.value[value].options._options.iconImageHref = icon;
  markers.value[value].balloon._showIcon();
}
//Центрирование карты
function centerMap(i) {
  const { latitude, longitude } = props.points[i].coordinates;
  optionsMap.value.coordinates = [latitude, longitude];
}
//Закрытие балуна, при закрытии попапа
watch(() => dataPopup.value, (v) => {
  if (v !== null) return;
  markers.value[prevPoint.value].balloon.close();
})
//Открытие балуна при клике на сайдбар
watch(() => props.selected, (v,ov) => {
  if (v === ov || v === null) return;
  balloonToggle(v);
  centerMap(v);
})

watch(() => changeCenter.value, (v) => {
  if (!v) return;
  if (!markers.value[prevPoint.value]?.balloon.isOpen()) {
    markers.value[prevPoint.value]?.balloon.open();
  }
})
//
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
