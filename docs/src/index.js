/* Third Party */
import Vue from 'vue';
import VueRouter from 'vue-router';

/* Configs */
import MSUi from '../../src';

import App from './App.vue';

Vue.use(VueRouter);
Vue.use(MSUi);

new Vue({
    el: '#app',
    render: (r) => r(App)
});
