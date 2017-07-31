export default {
    props: {
        fluid: Boolean
    },
    computed: {
        classes() {
            return {
                'ms-container': true,
                'ms-container--fluid': this.fluid
            };
        }
    },
    render(create) {
        return create('div', { class: this.classes }, this.$slots.default);
    }
};