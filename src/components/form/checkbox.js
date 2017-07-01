import Input from '../../mixins/input';
import Themeable from '../../mixins/themeable';
import Contextuable from '../../mixins/contextuable';

export default {
    mixins: [Input, Themeable, Contextuable],
    
    props: {
        checked: Boolean
    },
    computed: {
        classes() {
            return {
                'ms-checkbox': true,

                'ms-checkbox--disabled': this.disabled,
                'ms-checkbox--checked': this.isChecked,

                'ms-checkbox--primary': this.primary,
                'ms-checkbox--info': this.info,
                'ms-checkbox--success': this.success,
                'ms-checkbox--warning': this.warning,
                'ms-checkbox--error': this.error,
            }
        }
    }
}