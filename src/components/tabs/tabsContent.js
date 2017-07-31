export default {
    data() {
        return {
            isActive: false,
            reverse: false
        }
    },

    props: {
        id: {
            type: String,
            required: true
        },
        transition: {
            type: String,
            default: 'tab-transition'
        },
        reverseTransition: {
            type: String,
            default: 'tab-reverse-transition'
        }
    },

    computed: {
        computedTransition() {
            return this.reverse ? this.reverseTransition : this.transition;
        }
    },

    methods: {
        toggle(target, reverse, showTransition) {
            this.$el.style.transition = !showTransition ? 'none' : null;
            this.reverse = reverse;
            this.isActive = this.id === target;
        }
    },

    render(create) {
        return create(this.computedTransition, {}, [
            create('div', {
                'class': 'ms-tabs__content',
                domProps: { id: this.id },
                directives: [{
                    name: 'show',
                    value: this.isActive
                }],
                on: this.$listeners
            }, [this.$slots.default])]);
    }
}