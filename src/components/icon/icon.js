import BindEvents from '../../mixins/bindEvents';
import Themeable from '../../mixins/themeable';
import Contextuable from '../../mixins/contextuable';

export default {
    functional: true,

    mixins: [BindEvents, Themeable, Contextuable],

    props: {
        disabled: Boolean,
        left: Boolean,
        right: Boolean,
        medium: Boolean,
        large: Boolean,
        xLarge: Boolean
    },
    
    render(create, {props, data, children}) {
        const icon = children.pop().text;
        const iconClass = props.classFormat.replace(/%/g, icon);

        data.staticClass = (`${iconClass} ms-icon ${data.staticClass || ''}`).trim();

        let content = [];

        const classes = {
            'ms-icon--left': props.left,
            'ms-icon--right': props.right,
            'ms-icon--medium': props.medium,
            'ms-icon--large': props.large,
            'ms-icon--x-large': props.xLarge,
            'ms-icon--dark': props.dark,
            'ms-icon--light': props.light,
            'primary--text': props.primary,
            'info--text': props.info,
            'success--text': props.success,
            'warning--text': props.warning,
            'error--text': props.error,
        };

        const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ');
        iconClasses && (data.staticClass += ` ${iconClasses}`);

        if(props.inContent) content = icon;

        if(props.disabled) data.attrs.disabled = props.disabled;

        return create('span', data, content);
    }
}