import Themeable from '../../mixins/themeable'

export default {
    functional: true,

    mixins: [Themeable],

    props: {
        flat: Boolean,
        height: {
            type: String,
            default: 'auto'
        },
        hover: Boolean,
        img: String,
        raised: Boolean,
        tile: Boolean
    },

    render(create, { data, props, children }) {
        data.staticClass = (`ms-card ${data.staticClass || ''}`).trim();
        data.style = data.style || {};
        data.style.height = props.height;

        const classes = {
            'ms-card--flat': props.flat,
            'ms-card--horizontal': props.horizontal,
            'ms-card--hover': props.hover,
            'ms-card--raised': props.raised,
            'ms-card--tile': props.tile,
            'ms-theme--dark': props.dark,
            'ms-theme--light': props.light
        }

        const cardClasses = Object.keys(classes).filter(k => classes[k]).join(' ');
        cardClasses && (data.staticClass += ` ${cardClasses}`);

        if (props.img) {
            data.style.background = `url(${props.img}) center center / cover no-repeat`
        }

        return create('div', data, children)
    }
}