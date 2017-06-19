<template>
    <a v-if="href" :id="id" :href="href" :class="classes">
        <ms-icon v-if="prependIcon">{{prependIcon}}</ms-icon>
        <span class="text"><slot></slot></span>
        <ms-icon v-if="appendIcon">{{appendIcon}}</ms-icon>
    </a>
    <button v-else :id="id" :class="classes" :disabled="disabled">
        <ms-icon v-if="prependIcon">{{prependIcon}}</ms-icon>
        <span class="text"><slot></slot></span>
        <ms-icon v-if="appendIcon">{{appendIcon}}</ms-icon>
    </button>
</template>

<script>
import bindEvents from '../../mixins/bindEvents';

export default {
    mixins: [bindEvents],
    props: {
        id: String,
        href: String,
        disabled: String,
        primary: String,
        info: String,
        success: String,
        warning: String,
        danger: String,
        xs: String,
        sm: String,
        md: String,
        lg: String,
        xl: String,
        loading: String,
        prependIcon: String,
        appendIcon: String
    },
    computed: {
        classes() {

            let type = false;
            let size = false;

            const types = ['primary', 'info', 'success', 'warning', 'danger'];
            const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

            types.some((t) => {
                type = ['', true, 'true'].indexOf(this[t]) >= 0 ? t : type;
                return !!type;
            });

            sizes.some((s) => {
                size = ['', true, 'true'].indexOf(this[s]) >= 0 ? s : size;
                return !!size;
            });

            return [
                'ms-button',
                {'ms-button-disabled': typeof this.disabled !== 'undefined'},
                {[`ms-button-${size}`]: size},
                {[`ms-button-${type}`]: type}
            ];
        }
    }
};
</script>
