import { createSimpleFunctional } from '../../util/helpers'

import Tabs from './tabs';
import TabsBar from './tabsBar';
import TabsItem from './tabsItem';
import TabsContent from './tabsContent';
import TabsSlider from './tabsSlider';

const TabsItems = {
  render(h) {
    return h('div', { 'class': { 'ms-tabs__items': true } }, [this.$slots.default]);
  }
}

export default function install(Vue) {
  Vue.component('ms-tabs', Tabs);
  Vue.component('ms-tabs-bar', TabsBar);
  Vue.component('ms-tabs-items', TabsItems);
  Vue.component('ms-tabs-slider', TabsSlider);
  Vue.component('ms-tabs-item', TabsItem);
  Vue.component('ms-tabs-content', TabsContent);
}