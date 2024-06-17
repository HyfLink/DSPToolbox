import App from "@/App.vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { vueI18n } from "./locales";

const pinna = createPinia();

const app = createApp(App);
app.use(pinna);
app.use(vueI18n);
app.mount("#app");
