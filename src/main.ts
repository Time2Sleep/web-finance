import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import Antd from 'ant-design-vue'
import MainView from './views/MainView.vue';
import OperationsView from './views/OperationsView.vue';
import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
    { path: '/', component: MainView },
    { path: '/operations', component: OperationsView }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(App);
app.use(Antd);
app.use(router);
app.mount('#app');
