export default {
    functional: true,

    props: {
        title: {
            type: String,
            default: ''
        },
        tag: {
            type: String,
            default: 'div'  
        },
        light: {
            type: Boolean,
            default: true,
        },
        dark: Boolean,
        id: {
            type: String,
            default: 'page'
        }
    },
    render (create, { props, data, children }) {
        data.staticClass = `ms-page ${data.staticClass || ''}`;
        
        if(props.title) {
            document.title = props.title;
        }

        const classes = {
            'app--dark': props.dark,
            'app--light': !props.dark && props.light
        }

        data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ');
        data.domProps = { id: props.id }

        return create(props.tag, data, children);
    }
}