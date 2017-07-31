import Themeable from '../../mixins/themeable'

export default {
    mixins: [Themeable],

    provide() {
        return {
            slider: this.slider,
            tabClick: this.tabClick,
            isScrollable: () => this.scrollable,
            isMobile: () => this.isMobile
        }
    },

    data() {
        return {
            activators: [],
            activeIndex: null,
            isMobile: false,
            reverse: false,
            target: null,
            resizeDebounce: {},
            tabsSlider: null,
            targetEl: null,
            tabsContainer: null
        }
    },

    props: {
        centered: Boolean,
        right: Boolean,
        fixed: Boolean,
        grow: Boolean,
        mobileBreakPoint: {
            type: [Number, String],
            default: 1024
        },
        value: String,
        scrollable: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        classes() {
            return {
                'ms-tabs': true,
                'ms-tabs--centered': this.centered,
                'ms-tabs--right': this.right,
                'ms-tabs--fixed': this.fixed,
                'ms-tabs--grow': this.grow,
                'ms-tabs--mobile': this.isMobile,
                'ms-tabs--scroll-bars': this.scrollable,
                'ms-tabs--dark': this.dark,
                'ms-tabs--light': this.light
            }
        }
    },

    watch: {
        value() {
            this.tabClick(this.value);
        },
        activeIndex() {
            this.updateTabs();
            this.$emit('input', this.target);
            this.isBooted = true;
        }
    },

    mounted() {
        this.$ms.loaded(() => {
            window.addEventListener('resize', this.resize, { passive: true });
            this.resize();

            const activators = this.$slots.activators;

            if (!activators || !activators.length || !activators[0].componentInstance) return;

            const bar = activators[0].componentInstance.$children;

            const i = bar.findIndex(t => {
                return t.$el.firstChild.classList.contains('ms-tabs__item--active');
            });

            const tab = this.value || (bar[i !== -1 ? i : 0] || {}).action;

            tab && this.tabClick(tab) && this.resize();
        })
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.resize, { passive: true });
    },

    methods: {
        resize() {
            clearTimeout(this.resizeDebounce);

            this.resizeDebounce = setTimeout(() => {
                this.isMobile = window.innerWidth < this.mobileBreakPoint;
                this.slider();
            }, 50);
        },
        slider(el) {
            this.tabsSlider = this.tabsSlider || this.$el.querySelector('.ms-tabs__slider');
            this.tabsContainer = this.tabsContainer || this.$el.querySelector('.ms-tabs__container');

            if (!this.tabsSlider || !this.tabsContainer) return;

            this.targetEl = el || this.targetEl;

            if (!this.targetEl) return;

            // Gives DOM time to paint when
            // processing slider for
            // dynamic tabs
            this.$nextTick(() => {
                // #684 Calculate width as %
                const width = this.targetEl.scrollWidth / this.tabsContainer.clientWidth * 100;

                this.tabsSlider.style.width = `${width}%`;
                this.tabsSlider.style.left = `${this.targetEl.offsetLeft}px`;
            });
        },
        tabClick(target) {
            const setActiveIndex = index => {
                if (this.activeIndex === index) {
                    // #762 update tabs display
                    // In case tabs count got changed but activeIndex didn't
                    this.updateTabs();
                } else {
                    this.activeIndex = index;
                }
            };

            this.target = target;

            if (!this.$refs.content) {
                setActiveIndex(target);
                return;
            }

            this.$nextTick(() => {
                const nextIndex = this.$refs.content.$children.findIndex(i => i.id === this.target);
                this.reverse = nextIndex < this.activeIndex;
                setActiveIndex(nextIndex);
            });
        },
        updateTabs() {
            const activators = this.$slots.activators;

            if (!activators ||
                !activators.length ||
                (activators.length &&
                    !activators[0].componentInstance)) return;

            activators[0].componentInstance.$children
                .filter(i => i.$options._componentTag === 'ms-tabs-item')
                .forEach(i => i.toggle(this.target));

            this.$refs.content && this.$refs.content.$children.forEach(i => i.toggle(this.target, this.reverse, this.isBooted));
        }
    },

    render(create) {
        const content = [];
        const slot = [];
        const iter = (this.$slots.default || []);

        iter.forEach(c => {
            if (!c.componentOptions) slot.push(c);
            else if (c.componentOptions.tag === 'ms-tabs-content') content.push(c);
            else slot.push(c);
        });

        const tabs = content.length ? create('ms-tabs-items', {
            ref: 'content'
        }, content) : null;

        return create('div', {
            'class': this.classes
        }, [slot, this.$slots.activators, tabs]);
    }
}