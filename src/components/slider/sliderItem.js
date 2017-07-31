export default {
    props: {
        width: {
            type: [Number, String],
            default: 'auto'
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        classes() {
            return {
                'ms-slider__item': true
            }
        }
    },
    render(create) {

        const data = {
            class: this.classes,
            style: {
                width: !isNaN(this.width) ? `${this.width}px` : this.width
            }
        }

        return create(this.tag, data, this.$slots.default);
    }
}