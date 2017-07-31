import { createSimpleFunctional } from '../../util/helpers';

import Card from './card';
import CardMedia from './cardMedia';
import CardTitle from './cardTitle';

const CardActions = createSimpleFunctional('ms-card__actions');
const CardText = createSimpleFunctional('ms-card__text');

export default function install(Vue) {
    Vue.component('ms-card', Card);
    Vue.component('ms-card-media', CardMedia);
    Vue.component('ms-card-title', CardTitle);
    Vue.component('ms-card-actions', CardActions);
    Vue.component('ms-card-text', CardText);
}