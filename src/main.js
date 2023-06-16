import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./styles/main.less";
import YmapPlugin from "vue-yandex-maps";

const settings = {
  apiKey: "",
  lang: "ru_RU",
  coordorder: "latlong",
  enterprise: false,
  version: "2.1",
};

createApp(App).use(store).use(YmapPlugin, settings).mount("#app");
