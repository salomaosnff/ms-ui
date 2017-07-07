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
            type: [Array, Boolean],
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
                'ms-checkbox': true,
                
                'ms-checkbox--disabled': this.disabled,
                'ms-checkbox--checked': this.isChecked,

                'ms-checkbox--light': this.light && !this.dark,

                'ms-checkbox--primary': this.primary,
                'ms-checkbox--info': this.info,
                'ms-checkbox--success': this.success,
                'ms-checkbox--warning': this.warning,
                'ms-checkbox--error': this.error,
            }
        },
        isChecked: {
            get(){
                if(typeof this.inputModel === 'boolean'){
                    return this.inputModel;
                }

                return this.inputModel.includes(this.value);
            },
            set(val){
                let model = this.inputModel;

                // Para Model do Tipo Booleano
                if(typeof model === 'boolean'){
                    this.$emit('change', val);
                    return;
                }
                
                // Para Model do Tipo Array
                const index = model.indexOf(this.value);

                if(index >= 0){ // Remove se já existir
                    model.splice(index, 1);
                } else { // Adiciona se não existir
                    model.push(this.value);
                }

                // Atualizar o valor do model
                this.$emit('change', model);
            }
        }
    },
    methods: {
        toggle(e) {
            if(!this.disabled) {
                this.isChecked = !this.isChecked;

                // Validate
                this.$nextTick(this.validate);
            }
        },
        validate() {
            this.errorBucket = [];
            if(this.required && !this.isChecked) {
                this.errorBucket = ['Você deve marcar esta caixa.'];
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
                click: this.toggle
            }
        }

        const checkbox = create('span', {
            class: 'ms-checkbox__input'
        });

        const labelData = {
            class: 'ms-checkbox__label',
            domProps: {}
        }

        if(this.html) {
            labelData.domProps.innerHTML = this.label;
        } else {
            labelData.domProps.innerText = this.label;
        }

        const label = create('span', labelData);

        // Remove counter from details
        this.counter = false;

        return create('div', data, [checkbox, label, this.genDetails()]);
    }
}