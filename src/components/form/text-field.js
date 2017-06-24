import input from '../../mixins/input';
import contextuable from '../../mixins/contextuable';

export default {
    mixins: [input, contextuable],
    props: {
        tabindex: [Number, String],
        multiline: Boolean,
        autogrow: Boolean,
        autofocus: Boolean,
        readonly: Boolean,
        hint: String,
        minlen: [Number, String],
        maxlen: [Number, String],
        min: [Number, String],
        max: [Number, String],
        step: [Number, String],
        rows: {
            type: [Number, String],
            default: 5
        },
        prefix: String,
        suffix: String,
        center: Boolean,
        right: Boolean,
        prependIcon: String,
        prependIconCb: Function,
        appendIcon: String,
        appendIconCb: Function,
        counterMin: [String, Number],
        counterMax: [String, Number]
    },
    computed: {
        classes() {
            return {
                'input--center': this.center,
                'input--right': this.right,

                'input-group--primary': this.primary,
                'input-group--info': this.info,
                'input-group--success': this.success,
                'input-group--warning': this.warning,
                'input-group--error': this.error
            };
        },
        isDirty() {
            return this.lazyValue !== null && 
                    typeof this.lazyValue !== 'undefined' && 
                    this.lazyValue.toString().length > 0;
        },
        inputValue: {
            get() {
                return this.value;
            },
            set(val) {

                if ( this.modifiers.trim ) val = val.trim();
                if (this.modifiers.number) val = Number(val);
                if (!this.modifiers.lazy ) this.$emit('input', val);

                this.lazyValue = val;
            }
        },
        counter() {
            return this.inputValue ? this.inputValue.length : 0;
        },

        // Messages and Errors of input
        inputMessages(){
            const errors   = this.allErrors.map(e => ({type: 'error', text: e}));
            const messages = [];

            if(this.help) messages.push({type: 'help', text: this.help});
            return messages.concat(errors);
        }
    },
    watch: {
        value() {
            this.lazyValue = this.value;
            this.calcHeight();
        },
        errors(val){
            this.errorBucket = val;
        }
    },
    mounted () {
        this.calcHeight();
        this.autofocus && this.focus();
    },
    methods: {
        click() {
            this.tabFocused = false;
        },
        focus(e) {
            this.focused = true;
            this.$refs.input.focus();
            this.$emit('focus', e);
        },
        keyup(e) {
            if(e.keyCode === 9) {
                this.tabFocused = true;
            }
        },
        onInput(e) {
            this.inputValue = e.target.value;
            this.tabFocused = false;

            this.calcHeight();
        },
        blur(e) {
            this.focused = false;
            this.tabFocused = false;
            this.$nextTick(() => (this.focused = false));
            this.$refs.input.blur();
            this.validate();
            this.$emit('blur', e);
        },
        calcHeight() {
            if(!this.multiline || !this.autogrow) return;

            const height = this.$refs.input.scrollHeight;
            const minHeight = this.rows * 24;
            return this.inputHeight = height < minHeight ? minHeight : height;
        },
        genInput() {
            // Input Tag Name
            const tagName = this.multiline ? 'textarea' : 'input';

            // Input data
            const data = {
                style: {
                    'height': this.inputHeight && `${this.inputHeight}px`
                },

                domProps: {
                    id: this.id || this._uid,
                    value: this.lazyValue,
                    disabled: this.disabled,
                    autofocus: this.autofocus
                },
                
                attrs: {
                    tabindex: this.tabindex,
                    readonly: this.readonly,
                    placeholder: this.hint,
                    rows: this.multiline ? this.rows : false
                },

                on: {
                    blur: this.blur,
                    input: this.onInput,
                    focus: this.focus
                },
                
                ref: 'input'
            }

            // Set Input Id
            if(this.autocomplete) data.domProps.autocomplete = true;
            if(this.name) data.attrs.name = this.name;
            if(this.maxlen) data.attrs.maxlength = this.maxlen;
            if(this.step) data.attrs.step = this.step;

            if(!this.counter){
                if (this.max) data.attrs.max = this.max;
                if (this.min) data.attrs.min = this.min;
            }

            // Is a Textarea?
            if (this.multiline) {
                data.domProps.rows = this.rows
            } else {
                data.domProps.type = this.type
            }

            const children = [this.$createElement(tagName, data)];

            // Label
            this.label && children.push(this.genLabel());

            // Prefix and Suffix
            this.prefix && children.unshift(this.genFix('prefix'))
            this.suffix && children.push(this.genFix('suffix'))

            return children;
        },
        counterIsValid(){
            const val = (this.inputValue && this.inputValue.toString() || '')

            return (
                !this.counter ||
                (val.length >= this.counterMin && val.length <= this.counterMax)
            )
        },
        genCounter () {
            return this.$createElement('div', {
                'class': {
                'input-group__counter': true,
                'input-group__counter--error': !this.counterIsValid()
                }
            }, this.count)
        },
        genIcon(type){
            return this.$createElement('ms-icon', {
                class: `input__${type}-icon`,
                on: {
                    click: this[`${type}IconCb`] || (() => this.focus()),
                }
            }, this[`${type}Icon`]);
        },
        genPrefix() {
            return this.$createElement('span', {class: 'input--prefix'}, this.prefix);
        },
        genSuffix() {
            return this.$createElement('span', {class: 'input--suffix'}, this.suffix);
        }
    },
    data() {
        return {
            inputHeight: null
        }
    },

    render(create) {
        return this.genInputGroup(this.genInput(), {attrs: {tabindex: -1}});
    }
}