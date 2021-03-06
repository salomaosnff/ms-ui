export default {
    functional: true,

    props: {
        tag: {
            type: String,
            default: 'main'
        },
        light: {
            type: Boolean,
            default: true,
        },
        dark: Boolean,
        id: {
            type: String,
            default: 'app'
        }
    },
    render (create, { props, data, children }) {
        data.staticClass = `app ${data.staticClass || ''} `;

        const classes = {
            'app--dark': props.dark,
            'app--light': !props.dark && props.light
        }

        data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ');

        data.attrs['ms-app'] = true;
        data.domProps = { id: props.id };

        return create(props.tag, data, children);
    }
}