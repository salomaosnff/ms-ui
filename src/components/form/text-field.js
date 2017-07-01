import Input from '../../mixins/input';
import Themeable from '../../mixins/themeable'
import Contextuable from '../../mixins/contextuable';

export default {
    mixins: [Input, Themeable, Contextuable],
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
        counter: Boolean,
        counterMin: [String, Number],
        counterMax: [String, Number]
    },
    computed: {
        classes() {
            return {
                'input-group--center': this.center,
                'input-group--right': this.right,

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
                return this.lazyValue;
            },
            set(val) {

                if ( this.modifiers.trim ) val = val.trim();
                if (this.modifiers.number) val = Number(val);
                if (!this.modifiers.lazy ) this.$emit('input', val);

                this.lazyValue = val;
            }
        },
        inputRows() {
            if(!this.multiline) return false;
            if(!this.autogrow || !this.lazyValue) return this.rows;
            
            let rows = this.lazyValue.match(/[\n]/gm);
            rows = rows ? rows.length + 1 : 1;

            return rows > this.rows ? rows : this.rows;
        },
        count() {
            const count = this.inputValue ? this.inputValue.length : 0;
            return this.counterMax ? `${count}/${this.counterMax}` : count;
        },
        inputMessages(){
            const errors   = this.allErrors.map(e => ({type: 'error', text: e}));
            const messages = [];

            if(this.help) messages.push({type: 'help', text: this.help});
            return messages.concat(errors);
        }
    },
    
    mounted () {
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
        onInput(e) {
            this.inputValue = e.target.value;
            this.tabFocused = false;
            this.validate();
        },
        blur(e) {
            this.focused = false;
            this.tabFocused = false;
            this.$refs.input.blur();
            this.$emit('blur', e);
        },
        genInput() {

            // Input Tag Name
            const tagName = this.multiline ? 'textarea' : 'input';

            // Input data
            const data = {
                class: 'input-group__value',
                domProps: {
                    id: this.inputId,
                    value: this.lazyValue,
                    disabled: this.disabled,
                    autofocus: this.autofocus
                },
                
                attrs: {
                    tabindex: this.tabindex,
                    readonly: this.readonly,
                    placeholder: this.hint,
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
            if(this.minlen) data.attrs.minLength = this.minlen;
            if(this.maxlen) data.attrs.maxlength = this.maxlen;
            if(this.step) data.attrs.step = this.step;

            if(!this.counter){
                if (this.max) data.attrs.max = this.max;
                if (this.min) data.attrs.min = this.min;
            }

            // Is a Textarea?
            if (this.multiline) {
                data.domProps.rows = this.inputRows
            } else {
                data.domProps.type = this.type
            }

            const children = [this.$createElement(tagName, data)];

            

            // Prefix and Suffix
            if(!this.multiline){
                this.prefix && children.unshift(this.genFix('prefix'))
                this.suffix && children.push(this.genFix('suffix'))
            }
           
            // Icons
            this.appendIcon && children.push(this.genIcon('append'));

            // Label
            this.label && children.unshift(this.genLabel());

            return children;
        },
        counterIsValid(){
            const val = (this.inputValue && this.inputValue.toString() || '')

            if(this.counterMin || this.counterMin){
                return (
                    val.length >= this.counterMin && 
                    val.length <= this.counterMax
                )
            }

            return true
        },
        genCounter () {
            return this.$createElement('div', {
                'class': {
                'input-group__counter': true,
                'input-group__counter--error': !this.counterIsValid()
                }
            }, this.count)
        },
        genFix(type) {
            return this.$createElement('label', {
                class: `input--${type}`,
                attrs: {
                    for: this.inputId
                }
            }, this[type]);
        }
    },
    render(create) {
        return this.genInputGroup(this.genInput(), {attrs: {tabindex: -1}});
    }
}