import GenerateRouteLink from '../../mixins/route-link'

export default {
    inject: ['slider', 'tabClick'],
    mixins: [GenerateRouteLink],

    data() {
        return {
            isActive: false,
            defaultActiveClass: 'ms-tabs__item--active'
        }
    },

    props: {
        activeClass: {
            type: String,
            default: 'ms-tabs__item--active'
        }
    },

    computed: {
        classes() {
            return {
                'ms-tabs__item': true,
                'ms-tabs__item--active': !this.to && this.isActive,
                'ms-tabs__item--disabled': this.disabled
            }
        },
        action() {
            const to = this.to || this.href;

            if (!to || to === Object(to)) return this._uid;

            return to.replace('#', '');
        }
    },

    watch: {
        $route() {
            this.to && this.callSlider();
        }
    },

    mounted() {
        this.callSlider();
    },

    methods: {
        callSlider() {
            setTimeout(() => {
                this.$el.firstChild.classList.contains('ms-tabs__item--active') &&
                    this.slider(this.$el);
            }, 0);
        },
        click(e) {
            e.preventDefault();

            if (!this.to && !this.href) return;

            if (!this.to) {
                this.tabClick(this.action);
            }

            this.callSlider();
        },

        toggle(action) {
            this.isActive = this.action === action;

            this.$nextTick(() => {
                this.isActive && this.slider(this.$el);
            })
        }
    },

    render(create) {
        const { tag, data } = this.genLink();

        return create('li', {
            'class': 'ms-tabs__li'
        }, [create(tag, data, this.$slots.default)]);
    }
}