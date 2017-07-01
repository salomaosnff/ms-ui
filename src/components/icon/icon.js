import BindEvents from '../../mixins/bindEvents';
import Themeable from '../../mixins/themeable';

export default {
    functional: true,

    mixins: [BindEvents, Themeable],
    render(create, {props, data, children}) {
        const icon = children[0].text;
        const iconClass = props.classFormat.replace(/%/g, icon);

        data.staticClass = data.staticClass ? `${iconClass} ${data.staticClass} ` : `${iconClass} `

        let content = [];

        const classes = {
            'icon--dark': props.dark || !props.light,
            'icon--light': props.light || !props.dark
        };

        data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ');

        if(props.inContent) {
            content = icon;
        }

        return create('span', data, content);
    }
}