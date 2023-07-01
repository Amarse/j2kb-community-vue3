import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';
import { createPinia } from 'pinia';

//init style
import './assets/styles/_reset.css';

//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css';
//core
import 'primevue/resources/primevue.min.css';
//icon
import 'primeicons/primeicons.css';

//flex
import 'primeflex/primeflex.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue);
app.use(router);

app.mount('#app');
