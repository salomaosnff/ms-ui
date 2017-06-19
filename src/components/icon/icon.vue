<template>
    <span :class="classes">
        <slot v-if="['', 'true'].indexOf(inContent) >= 0"></slot>
    </span>
</template>

<script>
export default {
    data() {
        return {
            icon: ''
        };
    },
    mounted() {
        this.icon = this.$slots.default[0].text;
    },
    computed: {
        classes() {
            return this.classFormat.replace(/%/g, this.icon);
        }
    }
};
</script>
