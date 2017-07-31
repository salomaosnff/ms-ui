export default {
    functional: true,

    props: {
        primaryTitle: Boolean
    },

    render(create, { data, props, children }) {
        data.staticClass = (`ms-card__title ${data.staticClass || ''}`).trim();

        if (props.primaryTitle) data.staticClass += ' ms-card__title--primary';

        return create('div', data, children);
    }
}