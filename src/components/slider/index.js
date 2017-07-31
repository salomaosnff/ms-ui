import { createSimpleFunctional } from '../../util/helpers';

import Slider from './slider';
import SliderItem from './sliderItem';

export default function install(Vue) {
    Vue.component('ms-slider', Slider);
    Vue.component('ms-slider-item', SliderItem);
}