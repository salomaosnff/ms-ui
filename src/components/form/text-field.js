import input from '../../mixins/input';
import contextuable from '../../mixins/contextuable';

export default {
    mixins: [input, contextuable],
    props: {
        tabindex: [Number, String],
        number: Boolean,
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
        appendIconCb: Function
    },
    computed: {
        classes() {
            return {
                'input--group': true,
                'input--readonly': this.readonly,
                'input--error': this.errorBucket.length,
                'input--disabled': this.disabled,
                'input--focused': this.focused,
                'input--tabfocused': this.tabFocused,
                'input--required': this.required,
                'input--dirty': this.isDirty,
                'input--center': this.center,
                'input--right': this.right,
                'primary': this.primary,
                'info': this.info,
                'success': this.success,
                'warning': this.warning,
                'danger': this.danger
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
                if (this.modifiers.trim) {
                    val = val.trim();
                }

                if (this.modifiers.number) {
                    val = Number(val);
                }

                if (!this.modifiers.lazy) {
                    this.$emit('input', val);
                }

                this.lazyValue = val;
            }
        },
        counter() {
            return this.inputValue ? this.inputValue.length : 0;
        }
    },
    watch: {
        value() {
            this.lazyValue = this.value;
            this.calcHeight();
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
        input(e) {
            this.inputValue = e.target.value;
            this.tabFocused = false;

            this.calcHeight();
        },
        blur(e) {
            this.focused = false;
            this.tabFocused = false;
            this.$nextTick(() => (this.focused = false));
            this.$emit('blur', e);
        },
        calcHeight() {
            if(!this.multiline || !this.autogrow) return;

            const height = this.$refs.input.scrollHeight;
            const minHeight = this.rows * 24;
            return this.inputHeight = height < minHeight ? minHeight : height;
        },
        genInput() {

            // Input data
            const inputData = {
                style: {
                    'height': this.inputHeight && `${this.inputHeight}px`
                },
                on: {
                    click: this.click,
                    focus: this.focus,
                    keyup: this.keyup,
                    input: this.input,
                    blur: this.blur
                },
                attrs: {
                    type: this.number ? 'number' : 'text',
                    tabindex: this.tabindex,
                    placeholder: this.hint,
                    name: this.name,
                    minlength: this.minlen,
                    maxlength: this.maxlen,
                    min: this.number ? this.min : false,
                    max: this.number ? this.max : false,
                    step: this.number ? this.step : false,
                    rows: this.multiline ? this.rows : false
                },
                domProps: {
                    value: this.lazyValue,
                    disabled: this.disabled,
                    autofocus: this.autofocus
                },
                ref: 'input'
            }

            // Set Input Id
            if(this.id) inputData.attrs.id = this.id;

            // Input Tag Name
            const tagName = this.multiline ? 'textarea' : 'input';

            return this.$createElement(tagName, inputData);
        },
        genLabel() {

            // Label Data
            const labelData = {
                class: 'input--label',
                attrs: {}
            }

            // Set Label For
            if(this.id) labelData.attrs.for = this.id;

            return this.$createElement('label', labelData, [this.label]);
        },
        genCounter() {
            const counterData = {
                class: {
                    'input--counter': true
                }
            }

            // Create Counter Format
            const text = this.maxlen ? `${this.counter}/${this.maxlen}` : this.counter;

            return this.$createElement('span', counterData, [text]);
        },
        genMessages() {

            return this.$createElement('div');
        },
        genPrefix() {
            return this.$createElement('span', {class: 'input--prefix'}, this.prefix);
        },
        genSuffix() {
            return this.$createElement('span', {class: 'input--suffix'}, this.suffix);
        },
        genPrependedIcon() {
            const self = this;

            return this.$createElement('ms-icon', {
                class: 'input--prepend-icon',
                on: {
                    click: this.prependIconCb || function() {
                        self.focus();
                    },
                }
            }, [this.prependIcon]);
        },
        genAppendedIcon() {
            return this.$createElement('ms-icon', {
                class: 'input--append-icon',
                on: {
                    click: this.appendIconCb,
                }
            }, [this.appendIcon]);
        }
    },
    data() {
        return {
            inputHeight: null
        }
    },
    render(create) {

        const inputChildrens = [
            this.genLabel(),
            this.genInput()
        ];

        this.prefix && inputChildrens.unshift(this.genPrefix());
        this.suffix && inputChildrens.push(this.genSuffix());

        this.appendIcon && inputChildrens.push(this.genAppendedIcon());

        const inputGroup = create('div', {
            class:'input--container'
        }, inputChildrens);

        // Childrens
        const childrens = [
            inputGroup
        ];

        this.counter && childrens.push(this.genCounter());
        childrens.push(this.genMessages());

        this.prependIcon && childrens.unshift(this.genPrependedIcon());

        // Input Group
        return create('div', {
            class: this.classes
        }, childrens);
    }
}