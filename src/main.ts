import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";

//init style
import "./assets/styles/_reset.css";

//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
//core
import "primevue/resources/primevue.min.css";
//icon
import "primeicons/primeicons.css";

//flex
import "primeflex/primeflex.css";

const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.use(pinia);

app.mount("#app");