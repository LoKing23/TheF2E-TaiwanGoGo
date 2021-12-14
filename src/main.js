import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/style/index.css";
import "@fortawesome/fontawesome-free";
createApp(App).use(store).use(router).mount("#app");
