import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import '../public/css/main.css'

// import { datePipe } from './core/pipes/date.pipe';
// vue.filter('date', datePipe);
const app = createApp(App).use(store);
app.config.globalProperties.getToken = function () {
    return localStorage.getItem('easycare_scada_token')
}
app.config.globalProperties.getRequestConfig = function () {
    return {headers: {'Authorization': 'Bearer ' + this.getToken()}}
};
app.mount('#app');
