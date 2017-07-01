import Themeable from '../../mixins/themeable';

export default {
    mixins: [Themeable],

    props: {
        vertical: Boolean
    },
    render(create) {

        const classes = {
            'ms-hr': true,
            'ms-hr--vertical': this.vertical,
            'ms-hr--light': this.light
        }

        return create('div', {class: classes});
    }
}