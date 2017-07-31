export default {
    functional: true,

    props: {
        actions: Boolean,
        height: {
            type: String,
            default: 'auto'
        },
        img: String,
        stackedActions: Boolean
    },

    render(create, { props, data, children }) {
        data.staticClass = (`ms-card__row ${data.staticClass || ''}`).trim();
        data.style = data.style || {};
        data.style.height = props.height;

        if (props.img) data.style.background = `url(${props.img}) center center / cover no-repeat`;
        if (props.actions) {
            data.ref = 'actions';
            data.staticClass += ' ms-card__row--actions';
        }

        return create('div', data, children);
    }
}