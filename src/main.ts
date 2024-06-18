import App from "@/App.vue";
import { vueI18n } from "@/locales";

const app = createApp(App);
app.use(createPinia());
app.use(vueI18n);
app.mount("#app");
