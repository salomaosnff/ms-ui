import TextField from './text-field';
import Checkbox from './checkbox';
import Radio from './radio';
import Select from './select';

export default function install(Vue) {
    Vue.component('ms-text-field', TextField);
    Vue.component('ms-checkbox', Checkbox);
    Vue.component('ms-radio', Radio);
    Vue.component('ms-select', Select);
}