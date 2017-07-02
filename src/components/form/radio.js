import Input from '../../mixins/input';
import Themeable from '../../mixins/themeable';
import Contextuable from '../../mixins/contextuable';

export default {
    mixins: [Input, Themeable, Contextuable],
    props: {
        value: String,
        checked: Boolean,
        label: String,
        html: Boolean,
        inputModel: {
            type: [String, Boolean],
            default: false
        }
    },
    model: {
        prop: 'inputModel',
        event: 'change'
    },
    data() {
        return {
            inputValue: null,
            is_chk: null
        }
    },
    computed: {
        classes() {
            return {
                'ms-radio': true,
                
                'ms-radio--disabled': this.disabled,
                'ms-radio--checked': this.isChecked,

                'ms-radio--light': this.light && !this.dark,

                'ms-radio--primary': this.primary,
                'ms-radio--info': this.info,
                'ms-radio--success': this.success,
                'ms-radio--warning': this.warning,
                'ms-radio--error': this.error,
            }
        },
        isChecked: {
            get(){
                if(typeof this.inputModel === 'boolean'){
                    return this.inputModel;
                }

                return this.inputModel === this.value;
            },
            set(val){
                // Para Model do Tipo Booleano
                if(typeof this.inputModel === 'boolean') {
                    this.$emit('change', val);
                    return;
                }

                // Atualizar o valor do model
                this.$emit('change', this.value);
            }
        }
    },
    methods: {
        check(e) {
            if(!this.disabled) {
                this.isChecked = true;
            }
        }
    },
    render(create) {

        const data = {
            class: this.classes,
            attrs: {
                tabindex: -1
            },
            domProps: {
                id: this.inputId
            },
            on: {
                click: this.check
            }
        }

        const checkbox = create('span', {
            class: 'ms-radio__input'
        });

        const labelData = {
            class: 'ms-radio__label',
            domProps: {}
        }

        if(this.html) {
            labelData.domProps.innerHTML = this.label;
        } else {
            labelData.domProps.innerText = this.label;
        }

        const label = create('span', labelData);

        return create('div', data, [checkbox, label]);
    }
}