import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/base.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
app.use(createPinia());
app.use(router);

app.mount("#app");
