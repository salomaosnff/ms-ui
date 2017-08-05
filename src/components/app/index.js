import App from './App'
import Page from './Page';

export default function install(Vue) {
    Vue.component('ms-app', App);
    Vue.component('ms-page', Page);
}