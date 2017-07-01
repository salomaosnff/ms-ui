import Input from '../../mixins/input';
import Themeable from '../../mixins/themeable'
import Contextuable from '../../mixins/contextuable';

export default {
    mixins: [Input, Themeable, Contextuable],
    props: {
        items: {
            type: [Array, Object],
            default: () => []
        },
        html: Boolean,
        tabindex: [Number, String],
        autofocus: Boolean,
        prependIcon: String,
        prependIconCb: Function,
        appendIcon: String,
        appendIconCb: Function
    },
    data() {
        return {
            currentItem: 0
        }
    },
    computed: {
        classes() {
            return {
                'ms-select': true,

                'ms-select--disabled': this.disabled,

                'ms-select--primary': this.primary,
                'ms-select--info': this.info,
                'ms-select--success': this.success,
                'ms-select--warning': this.warning,
                'ms-select--error': this.error,
            }
        },
        filtredItems() {
            if(this.items instanceof Array) {
                return this.items.map(e => {
                    const defaults = {
                        disabled: false,
                        type: 'item',
                        text: null,
                        value: null
                    }

                    if(typeof e === 'object') {
                        return Object.assign(defaults, e);
                    } else if(typeof e === 'string') {
                        return Object.assign(defaults, {text: e});
                    }
                })
            }
            return [];
        },
        current() {
            return this.filtredItems[this.currentItem] || false;
        }
    },
    methods: {
        select(index) {
            this.currentItem = index;
        },
        genItem(item, index) {

            let text = item.text || item.value;

            if(item.value === null) {
                item.value = index;
            }

            if(item.text === null) {
                item.text = item.value;
            }

            const data = {
                class: {
                    'ms-select__item': true,
                    [`ms-select__item--${item.type}`]: item.type !== 'item',
                    'ms-select__item--disabled': item.disabled,
                    'ms-select__item--active': this.currentItem === index
                },
                on: {},
                directives: []
            }

            if(this.html) {
                data.directives.push({
                    name: 'v-text',
                    value: text
                });

                text = [];
            }

            if(!item.disabled && item.type === 'item') {
                data.on.click = e => this.select(index);
            }

            return this.$createElement('li', data, text);

        },
        genItems() {

            const items = this.filtredItems.map(this.genItem);

            console.log(items);

            const data = {
                class: 'ms-select__items'
            }

            return this.$createElement('ul', data, items);
        },
        genSelect() {

            const items = this.genItems();

            console.log(items);

            const data = {
                class: {
                    'ms-select__value': true
                }
            }

            return this.$createElement('div', data, [items]);
        }
    },
    render(create) {
        return this.genInputGroup(this.genSelect(), {attr: {tabindex: -1}});
    }
}