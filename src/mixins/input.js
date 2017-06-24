import toggleable from './toggleable';

export default {
    props: {
        id: String,
        name: String,
        required: Boolean,
        value: {
            required: false
        },
        disabled: Boolean,
        label: String,
        errors: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            errorBucket: [],
            tabFocused: true,
            focused: false,
            lazyValue: this.value
        }
    },
    computed: {
        modifiers() {
            const modifiers = {
                lazy: false,
                number: false,
                trim: false
            }

            if (!this.$vnode.data.directives) {
                return modifiers
            }

            const model = this.$vnode.data.directives.find(i => i.name === 'model')

            if (!model) {
                return modifiers
            }

            return Object.assign(modifiers, model.modifiers)
        },
    },
    methods: {}
}