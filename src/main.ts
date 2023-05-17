import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

//init style
import "./assets/styles/_reset.css"

//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
//core
import "primevue/resources/primevue.min.css";

const app = createApp(App);
app.use(PrimeVue);

app.mount('#app')
