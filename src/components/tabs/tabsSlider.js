import Contextuable from '../../mixins/contextuable';

export default {
    functional: true,

    mixins: [Contextuable],

    props: {
        top: Boolean,
        height: [String, Number]
    },
    render: (create, { props, data, children }) => {
        data.staticClass = (`ms-tabs__slider ${data.staticClass || ''}`).trim();

        const classes = {
            'ms-tabs__slider--top': props.top,
            'primary--bg': props.primary,
            'info--bg': props.info,
            'success--bg': props.success,
            'warning--bg': props.warning,
            'error--bg': props.error
        }

        const sliderClasses = Object.keys(classes).filter(k => classes[k]).join(' ');
        sliderClasses && (data.staticClass += ` ${sliderClasses}`);

        const height = props.height ?
            (typeof props.height === 'number' ? `${props.height}px` : props.height) : false;

        data = Object.assign(data, {
            style: {
                height: height
            }
        });

        return create('li', data, children);
    }
}