import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./styles/main.less";

createApp(App).use(store).mount("#app");
