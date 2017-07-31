import { createSimpleFunctional } from '../../util/helpers';

import Container from './container';
import Layout from './layout';
import Flex from './flex';
const Spacer = createSimpleFunctional('ms-spacer');

export default function install(Vue) {
    Vue.component('ms-container', Container);
    Vue.component('ms-spacer', Spacer);
    Vue.use(Layout);
    Vue.use(Flex);
}
