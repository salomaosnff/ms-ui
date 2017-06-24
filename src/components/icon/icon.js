import bindEvents from '../../mixins/bindEvents';

export default {
    mixins: [bindEvents],
    data() {
        return {
            icon: ''
        };
    },
    mounted() {
        this.icon = this.$slots.default[0].text;
    },
    computed: {
        classes() {
            return this.classFormat.replace(/%/g, this.icon);
        }
    },
    render(create) {
        const childrens = ['', true].includes(this.inContent) ? this.$slots.default : [];
        return create('span', {class: this.classes}, childrens);
    }
}