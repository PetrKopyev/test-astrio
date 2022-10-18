import Vue from 'vue'
import 'normalize.css';
import '@/styles/_main.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI);

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
