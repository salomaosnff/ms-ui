import BindEvents from '../../mixins/bindEvents';
import Themeable from '../../mixins/themeable';

export default {
    functional: true,

    mixins: [BindEvents, Themeable],
    render(create, {props, data, children}) {
        
        const icon = children[0].text;
        const iconClass = props.classFormat.replace(/%/g, icon);
        let content = [];

        const classes = typeof data.class === 'string' ? data.class :
                        Object.keys(data.class)
                        .filter(c => data.class[c]).join(' ');

        data.class = {
            'icon--dark': props.dark || !props.light,
            'icon--light': props.light || !props.dark,
            [iconClass]: true,
            [classes]: true
        };

        if(props.inContent) {
            content = icon;
        }

        return create('span', data, content);
    }
}