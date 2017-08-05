import Detachable from '../../mixins/detachable';
import Overlayable from '../../mixins/overlayable';
import Toggleable from '../../mixins/toggleable';

export default {
    mixins: [Detachable, Overlayable, Toggleable],

    props: {
        disabled: Boolean,
        persistent: Boolean,
        fullscreen: Boolean,
        origin: {
            type: String,
            default: 'center center'
        },
        width: {
            type: [String, Number],
            default: 290
        },
        scrollable: Boolean,
        transition: {
            type: [String, Boolean],
            default: 'dialog-transition'
        }
    },
    computed: {
        classes() {
            return {
                [(`ms-dialog ${this.contentClass}`).trim()]: true,
                'ms-dialog--active': this.isActive,
                'ms-dialog--fullscreen': this.fullscreen,
                'ms-dialog--scrollable': this.scrollable
            }
        }
    },
    watch: {
        isActive(val) {
            if (val) {
                !this.fullscreen && !this.hideOverlay && this.genOverlay();
                this.fullscreen && this.hideScroll();
            } else {
                if (!this.fullscreen) this.removeOverlay();
                else this.showScroll();
            }
        }
    },
    mounted() {
        this.$ms.loaded(() => (this.isActive && this.genOverlay()));
    },
    methods: {
        closeConditional(e) {
            return !this.persistent;
        }
    },
    render(create) {
        let children = [];

        const data = {
            class: this.classes,
            ref: 'dialog',
            directives: [
                { name: 'click-outside', value: this.closeConditional },
                { name: 'show', value: this.isActive }
            ]
        }

        if (!this.fullscreen) {
            data.style = {
                width: isNaN(this.width) ? this.width : `${this.width}px`
            }
        }

        if (this.$slots.activator) {
            children.push(create('div', {
                class: 'ms-dialog__activator',
                on: {
                    click: e => {
                        e.stopPropagation();
                        if (!this.disabled) this.isActive = !this.isActive;
                    }
                }
            }, [this.$slots.activator]));
        }

        const dialog = create('transition', {
            props: {
                name: this.transition || '',
                origin: this.origin
            }
        }, [create('div', data, this.$slots.default)]);

        children.push(create('div', {
            class: 'ms-dialog__content',
            ref: 'content'
        }, [dialog]));

        return create('div', {
            class: 'ms-dialog__container',
            style: {
                display: !this.$slots.activator && 'none' ? 'block' : 'inline-block'
            }
        }, children);
    }
}