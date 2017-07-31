import Icon from '../../components/icon/icon';
import Resizable from '../../mixins/resizable';
import Themeable from '../../mixins/themeable';
import Contextuable from '../../mixins/contextuable';

export default {
    mixins: [Resizable, Themeable, Contextuable],

    props: {
        touch: {
            type: Boolean,
            default: true
        },
        controls: {
            type: Boolean,
            default: true
        },
        controlsTransition: {
            type: String,
            default: 'fade-transition'
        }
    },
    data() {
        return {
            isOverflowing: false,
            scrollOffset: 0,
            itemOffset: 0,
            startX: 0
        }
    },
    computed: {
        classes() {
            return {
                'ms-slider': true,
                'ms-slider--primary': this.primary,
                'ms-slider--info': this.info,
                'ms-slider--success': this.success,
                'ms-slider--warning': this.warning,
                'ms-slider--error': this.error,
                'ms-theme--dark': this.dark,
                'ms-theme--light': this.light
            }
        },
        containerClasses() {
            return {
                'ms-slider__container': true
            }
        },
        wrapperClasses() {
            return {
                'ms-slider__wrapper': true,
                'ms-slider__wrapper--overflow': this.isOverflowing
            }
        },
        containerStyles() {
            return {
                'transform': `translateX(${-this.scrollOffset}px)`
            }
        },
        leftIconVisible() {
            return this.isOverflowing && this.scrollOffset > 0;
        },
        rightIconVisible() {
            if (!this.isOverflowing) return;

            // Check one scroll ahead to know the width of right-most item
            const item = this.newOffsetRight(this.scrollOffset, this.itemOffset);
            const lastItemWidth = item && this.$refs.container.children[item.index].clientWidth || 0;

            return this.$refs.container.scrollWidth - (this.scrollOffset + this.$refs.container.clientWidth) > lastItemWidth * 0.30;
        }
    },
    mounted() {
        this.onResize();
    },
    methods: {
        genContainer() {
            return this.$createElement('div', {
                'class': this.containerClasses,
                'style': this.containerStyles,
                ref: 'container'
            }, this.$slots.default);
        },
        genIcon(direction) {
            const icon = this.$createElement(Icon, {
                props: { [`${direction}`]: true },
                class: 'ms-slider__nav-icon',
                directives: [{
                    name: 'show',
                    value: this[`${direction}IconVisible`]
                }],
                on: {
                    click: this[`scroll${direction.charAt(0).toUpperCase() + direction.slice(1)}`]
                }
            }, `chevron-${direction}`);

            return this.$createElement('transition', {
                props: {name: this.controlsTransition}
            }, [icon]);
        },
        genWrapper() {
            return this.$createElement('div', {
                class: this.wrapperClasses,
                directives: this.touch ? [{
                    name: 'touch',
                    value: {
                        start: this.start,
                        move: this.move,
                        end: this.end
                    }
                }] : []
            }, [this.genContainer()]);
        },
        start(e) {
            this.startX = this.scrollOffset + e.touchstartX;
            this.$refs.container.style.transition = 'none';
        },
        move(e) {
            const offset = this.startX - e.touchmoveX;
            this.scrollOffset = offset;
        },
        end(e) {
            this.$refs.container.style.transition = null;
            if (this.scrollOffset < 0) {
                this.scrollOffset = 0;
            } else if (this.scrollOffset >= this.$refs.container.scrollWidth) {
                const lastItem = this.$refs.container.children[this.$refs.container.children.length - 1];
                this.scrollOffset = this.$refs.container.scrollWidth - lastItem.clientWidth;
            }
        },
        scrollLeft() {
            const data = this.newOffset('Left');
            if(data === null) return;

            this.scrollOffset = data.offset;
            this.itemOffset = data.index;
        },
        scrollRight() {
            const data = this.newOffset('Right');
            if(data === null) return;

            this.scrollOffset = data.offset;
            this.itemOffset = data.index;
        },
        onResize() {
            this.isOverflowing = this.$refs.container.clientWidth < this.$refs.container.scrollWidth;
        },
        newOffset(direction) {
            return this[`newOffset${direction}`](this.scrollOffset, this.itemOffset);
        },
        newOffsetLeft(currentOffset, currentIndex) {
            const items = this.$refs.container.children;
            let offset = 0;

            for (let index = currentIndex - 1; index >= 0; index--) {
                if (items[index].classList.contains('ms-slider__item')) {
                    if (offset + items[index].clientWidth >= this.$refs.container.clientWidth) {
                        return { offset: currentOffset - offset, index: index + 1 };
                    }
                    offset += items[index].clientWidth;
                }
            }

            return { offset: 0, index: 0 };
        },
        newOffsetRight(currentOffset, currentIndex) {
            const items = this.$refs.container.children;
            let offset = currentOffset;

            for (let index = currentIndex; index < items.length; index++) {
                if (items[index].classList.contains('ms-slider__item')) {
                    if (offset + items[index].clientWidth > currentOffset + this.$refs.container.clientWidth) {
                        return { offset, index };
                    }
                    offset += items[index].clientWidth;
                }
            }

            return null;
        }
    },
    render(create) {
        return create('div', {
            class: this.classes
        }, [
            this.genWrapper(),
            this.controls ? this.genIcon('left') : null,
            this.controls ? this.genIcon('right') : null
        ]);
    }
}